resource "aws_lambda_permission" "allow_ws_connect" {
  statement_id  = "AllowExecutionFromAPIGatewayConnect"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_ws_connect_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.soccerize_ws_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "allow_ws_disconnect" {
  statement_id  = "AllowExecutionFromAPIGatewayDisconnect"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_ws_disconnect_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.soccerize_ws_api.execution_arn}/*/*"
}
