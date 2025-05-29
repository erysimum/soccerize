output "websocket_url" {
  value = "wss://${aws_apigatewayv2_api.soccerize_ws_api.id}.execute-api.${var.region}.amazonaws.com/${aws_apigatewayv2_stage.dev.name}"
}