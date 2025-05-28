resource "aws_iam_role" "lambda_ws_connect_role" {
  name = "lambda-ws-connect-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = "sts:AssumeRole",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_policy" "lambda_ws_connect_policy" {
  name = "lambda-ws-connect-policy"

  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PutConnectionId",
        Effect: "Allow",
        Action: ["dynamodb:PutItem"],
        Resource: aws_dynamodb_table.websocket_connection_table.arn
      },
      {
        Sid: "CloudWatchLogging",
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource: "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_ws_connect_attach" {
  role       = aws_iam_role.lambda_ws_connect_role.name
  policy_arn = aws_iam_policy.lambda_ws_connect_policy.arn
}
