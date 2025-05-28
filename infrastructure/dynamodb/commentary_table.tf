## Dynamo DB
resource "aws_dynamodb_table" "commentary_table" {
  name         = "SoccerizeCommentary"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "matchId"
  range_key    = "timestamp"
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"  # We want new records

  attribute {
    name = "matchId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }
}

