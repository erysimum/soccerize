resource "aws_lambda_function" "ws_disconnect" {
  function_name = "soccerize-ws-disconnect"
  role          = aws_iam_role.lambda_ws_disconnect_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = "${path.module}/../../lambda-functions/websockets/disconnect/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../../lambda-functions/websockets/disconnect/lambda.zip")


  environment {
    variables = {
      CONNECTION_TABLE = aws_dynamodb_table.websocket_connection_table.name
    }
  }
  depends_on = [aws_iam_role_policy_attachment.lambda_ws_disconnect_attach]

}
