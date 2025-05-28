resource "aws_lambda_function" "ws_connect" {
  function_name = "soccerize-ws-connect"
  role          = aws_iam_role.ws_lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = "${path.module}/../lambda-websocket-connect/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../lambda-websocket-connect/lambda.zip")

  environment {
    variables = {
      CONNECTION_TABLE = aws_dynamodb_table.websocket_connection_table.name
    }
  }
}
