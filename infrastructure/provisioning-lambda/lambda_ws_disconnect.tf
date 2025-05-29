resource "aws_lambda_function" "ws_disconnect" {
  function_name = "soccerize-ws-disconnect"
  role          = var.role_ws_disconnect_lambda
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = "${path.module}/../../lambda-functions/websockets/disconnect/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../../lambda-functions/websockets/disconnect/lambda.zip")


  environment {
    variables = {
      CONNECTION_TABLE = var.websocket_table_name
    }
  }
 //depends_on = [var.role_ws_disconnect_lambda]


}
