##SQS 
resource "aws_sqs_queue" "commentary_dlq" {
  name = "soccerize-commentary-dlq"
}

resource "aws_sqs_queue" "commentary_queue" {
  name                      = "soccerize-commentary-queue"
  visibility_timeout_seconds = 60 
  message_retention_seconds = 200
  delay_seconds             = 0
  receive_wait_time_seconds = 20
  max_message_size          = 262144

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.commentary_dlq.arn
    maxReceiveCount     = 3  # After 3 failures, send to DLQ
  })
}


## Dynamo DB
resource "aws_dynamodb_table" "commentary_table" {
  name         = "SoccerizeCommentary"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "matchId"
  range_key    = "timestamp"
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"  # We want new records

  attribute {
    name = "matchId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }
}

##ROLE, POLICY,ATTACHEMENT
#IAM ROLE
resource "aws_iam_role" "lambda_role" {
  name = "lambda-commentary-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

#IAM POLICY
data "aws_caller_identity" "current" {}
resource "aws_iam_policy" "lambda_managed_policy" {
  name = "lambda-commentary-managed-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "DynamoDBAccess",
        Effect = "Allow",
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem"
        ],
        Resource = aws_dynamodb_table.commentary_table.arn
      },
      {
        Sid    = "SQSAccess",
        Effect = "Allow",
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ],
        Resource = aws_sqs_queue.commentary_queue.arn
      },
      {
        Sid    = "CloudWatchLogs",
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource: "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/soccerize-commentary:*"
      }
    ]
  })
}
#ATTACH POLICY TO ROLE
resource "aws_iam_role_policy_attachment" "lambda_attach_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_managed_policy.arn
}

#LAMBDA FUNCTION
resource "aws_lambda_function" "commentary_lambda" {
  function_name = "soccerize-commentary"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.lambda_role.arn

  filename         = "../lambda-commentary/lambda.zip"
  source_code_hash = filebase64sha256("../lambda-commentary/lambda.zip")

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.commentary_table.name
    }
  }
}
#LAMBDA EVENT SOURCE MAPPING
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.commentary_queue.arn
  function_name    = aws_lambda_function.commentary_lambda.arn
  batch_size       = 1
  enabled          = true

  depends_on = [
  aws_iam_role_policy_attachment.lambda_attach_policy
]
}