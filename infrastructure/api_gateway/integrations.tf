resource "aws_apigatewayv2_integration" "connect_integration" {
  api_id             = aws_apigatewayv2_api.soccerize_ws_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = var.lambda_ws_connect_arn
 
}

resource "aws_apigatewayv2_integration" "disconnect_integration" {
  api_id             = aws_apigatewayv2_api.soccerize_ws_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = var.lambda_ws_disconnect_arn

}

