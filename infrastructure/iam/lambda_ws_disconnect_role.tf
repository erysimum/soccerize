resource "aws_iam_role" "lambda_ws_disconnect_role" {
  name = "lambda-ws-disconnect-role"

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

resource "aws_iam_policy" "lambda_ws_disconnect_policy" {
  name = "lambda-ws-disconnect-policy"

  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "DeleteConnectionId",
        Effect: "Allow",
        Action: ["dynamodb:DeleteItem"],
        Resource: aws_dynamodb_table.websocket_connection_table.arn
      },
      {
        Sid: "CloudWatchLogs",
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

resource "aws_iam_role_policy_attachment" "lambda_ws_disconnect_attach" {
  role       = aws_iam_role.lambda_ws_disconnect_role.name
  policy_arn = aws_iam_policy.lambda_ws_disconnect_policy.arn
}
