
#SQS
output "sqs_queue_url" {
  value = aws_sqs_queue.commentary_queue.id
}
# output "sqs_commentary_queue_url" {
#   value = aws_sqs_queue.commentary_queue.url
# }

output "sqs_commentary_queue_arn" {
  value = aws_sqs_queue.commentary_queue.arn
}



##DYNAMODB
output "dynamodb_commentary_table_name" {
  value = aws_dynamodb_table.commentary_table.name
}

output "dynamodb_websocket_table_name" {
  value = aws_dynamodb_table.websocket_connection_table.name
}

#CLOUDWATCH LOGS

output "log_group_name" {
  value = "/aws/lambda/${aws_lambda_function.commentary_lambda.function_name}"
}

##LAMBDA ARN
output "lambda_commentary_arn" {
  value = aws_lambda_function.commentary_lambda.arn
}

output "lambda_ws_connect_arn" {
  value = aws_lambda_function.ws_connect.arn
}

output "lambda_ws_disconnect_arn" {
  value = aws_lambda_function.ws_disconnect.arn
}

output "lambda_broadcast_stream_arn" {
  value = aws_lambda_function.lambda_broadcast_stream.arn
}

#IAM ROLE ARN
output "role_commentary_lambda" {
  value = aws_iam_role.lambda_role.arn
}

output "role_ws_connect_lambda" {
  value = aws_iam_role.lambda_ws_connect_role.arn
}

output "role_ws_disconnect_lambda" {
  value = aws_iam_role.lambda_ws_disconnect_role.arn
}

output "role_broadcast_lambda" {
  value = aws_iam_role.lambda_broadcast_stream_role.arn
}

##WEBSOCKET URL
output "websocket_url" {
  value = "wss://${aws_apigatewayv2_api.soccerize_ws_api.id}.execute-api.${var.region}.amazonaws.com/${aws_apigatewayv2_stage.dev.name}"
  description = "WebSocket connection URL for frontend"
}
