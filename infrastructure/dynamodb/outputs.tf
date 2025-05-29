output "dynamodb_commentary_table_name" {
  value = aws_dynamodb_table.commentary_table.name
}

output "dynamodb_websocket_table_name" {
  value = aws_dynamodb_table.websocket_connection_table.name
}


output "commentary_table_stream_arn" {
  value = aws_dynamodb_table.commentary_table.stream_arn
}

output "commentary_table_arn" {
  value = aws_dynamodb_table.commentary_table.arn
}

output "websocket_table_arn" {
  value = aws_dynamodb_table.websocket_connection_table.arn
}
