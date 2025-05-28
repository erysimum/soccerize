resource "aws_dynamodb_table" "websocket_connection_table" {
  name         = "SoccerizeConnections"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "connectionId"

  attribute {
    name = "connectionId"
    type = "S"
  }
}
