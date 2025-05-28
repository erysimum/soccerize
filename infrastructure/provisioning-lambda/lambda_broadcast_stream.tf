resource "aws_lambda_function" "lambda_broadcast_stream" {
  function_name = "soccerize-broadcast-stream"
  role          = aws_iam_role.lambda_broadcast_stream_role.arn

  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = "${path.module}/../../lambda-functions/websockets/broadcast/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../../lambda-functions/websockets/broadcast/lambda.zip")


  environment {
    variables = {
      CONNECTION_TABLE = aws_dynamodb_table.websocket_connection_table.name
      ENDPOINT         = "https://${aws_apigatewayv2_api.soccerize_ws_api.id}.execute-api.${var.region}.amazonaws.com/${aws_apigatewayv2_stage.dev.name}"
    }
  }
  depends_on = [aws_iam_role_policy_attachment.lambda_broadcast_stream_attach]

}

resource "aws_lambda_event_source_mapping" "ddb_stream_trigger" {
  event_source_arn  = aws_dynamodb_table.commentary_table.stream_arn
  function_name     = aws_lambda_function.lambda_broadcast_stream.arn
  starting_position = "LATEST"
  batch_size        = 1
  enabled           = true
}
