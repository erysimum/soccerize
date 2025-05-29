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

# output "log_group_name" {
#   value = "/aws/lambda/${aws_lambda_function.commentary_lambda.function_name}"
# }