resource "aws_iam_role" "lambda_broadcast_stream_role" {
  name = "lambda-broadcast-stream-role"

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

resource "aws_iam_policy" "lambda_broadcast_stream_policy" {
  name = "lambda-broadcast-stream-policy"

  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "WebSocketConnections",
        Effect: "Allow",
        Action: ["dynamodb:Scan", "dynamodb:DeleteItem"],
        Resource: aws_dynamodb_table.websocket_connection_table.arn
      },
      {
        Sid: "PushToWebSocket",
        Effect: "Allow",
        Action: ["execute-api:ManageConnections"],
        Resource: "*"
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

resource "aws_iam_role_policy_attachment" "lambda_broadcast_stream_attach" {
  role       = aws_iam_role.lambda_broadcast_stream_role.name
  policy_arn = aws_iam_policy.lambda_broadcast_stream_policy.arn
}
