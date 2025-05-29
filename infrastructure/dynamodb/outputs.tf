output "dynamodb_commentary_table_name" {
  value = aws_dynamodb_table.commentary_table.name
}

output "dynamodb_websocket_table_name" {
  value = aws_dynamodb_table.websocket_connection_table.name
}