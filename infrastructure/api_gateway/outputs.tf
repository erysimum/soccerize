# output "websocket_url" {
#   value = "wss://${aws_apigatewayv2_api.soccerize_ws_api.id}.execute-api.${var.region}.amazonaws.com/${aws_apigatewayv2_stage.dev.name}"
# }
output "websocket_url_for_frontend" {
  value = "wss://${aws_apigatewayv2_api.soccerize_ws_api.id}.execute-api.${var.region}.amazonaws.com/${aws_apigatewayv2_stage.dev.name}"
}

output "websocket_endpoint_for_lambda" {
  value = "${aws_apigatewayv2_api.soccerize_ws_api.id}.execute-api.${var.region}.amazonaws.com/${aws_apigatewayv2_stage.dev.name}"
}
