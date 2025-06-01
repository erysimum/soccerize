resource "aws_lambda_function" "lambda_broadcast_stream" {
  function_name = "soccerize-broadcast-stream"
  role          =  var.role_broadcast_lambda

  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = "${path.module}/../../lambda-functions/websockets/broadcast/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../../lambda-functions/websockets/broadcast/lambda.zip")


  environment {
    variables = {
      CONNECTION_TABLE = var.websocket_table_name
      ENDPOINT         = var.websocket_endpoint_for_lambda
    }
  }
 //depends_on = [var.role_broadcast_lambda]


}

resource "aws_lambda_event_source_mapping" "ddb_stream_trigger" {
  event_source_arn  = var.broadcast_stream
  function_name     = aws_lambda_function.lambda_broadcast_stream.arn
  starting_position = "LATEST"
  batch_size        = 1
  enabled           = true
}
