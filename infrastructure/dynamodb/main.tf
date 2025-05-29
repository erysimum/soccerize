# Commentary Table
resource "aws_dynamodb_table" "commentary_table" {
  name         = "SoccerizeCommentary"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "matchId"
  range_key    = "timestamp"
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"

  attribute {
    name = "matchId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }
}

# WebSocket Connection Table
resource "aws_dynamodb_table" "websocket_connection_table" {
  name         = "SoccerizeConnections"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "connectionId"

  attribute {
    name = "connectionId"
    type = "S"
  }
}
