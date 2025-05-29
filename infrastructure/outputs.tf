### SQS Outputs
output "sqs_queue_url" {
  value = module.sqs.sqs_queue_url
}

output "sqs_commentary_queue_arn" {
  value = module.sqs.sqs_commentary_queue_arn
}

### DynamoDB Outputs
output "dynamodb_commentary_table_name" {
  value = module.dynamodb.dynamodb_commentary_table_name
}

output "dynamodb_websocket_table_name" {
  value = module.dynamodb.dynamodb_websocket_table_name
}

output "commentary_table_stream_arn" {
  value = module.dynamodb.commentary_table_stream_arn
}

### Lambda Outputs
output "lambda_commentary_arn" {
  value = module.provisioning_lambda.lambda_commentary_arn
}

output "lambda_ws_connect_arn" {
  value = module.provisioning_lambda.lambda_ws_connect_arn
}

output "lambda_ws_disconnect_arn" {
  value = module.provisioning_lambda.lambda_ws_disconnect_arn
}

output "lambda_broadcast_stream_arn" {
  value = module.provisioning_lambda.lambda_broadcast_stream_arn
}

### IAM Role Outputs
output "role_commentary_lambda" {
  value = module.iam.role_commentary_lambda
}

output "role_ws_connect_lambda" {
  value = module.iam.role_ws_connect_lambda
}

output "role_ws_disconnect_lambda" {
  value = module.iam.role_ws_disconnect_lambda
}

output "role_broadcast_lambda" {
  value = module.iam.role_broadcast_lambda
}

### API Gateway Output
output "websocket_url" {
  value = module.api_gateway.websocket_url
}
