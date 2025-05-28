output "lambda_name" {
  value = aws_lambda_function.commentary_lambda.function_name
}

output "sqs_queue_url" {
  value = aws_sqs_queue.commentary_queue.id
}

output "dynamodb_table" {
  value = aws_dynamodb_table.commentary_table.name
}

output "log_group_name" {
  value = "/aws/lambda/${aws_lambda_function.commentary_lambda.function_name}"
}
