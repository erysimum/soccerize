##SQS 
resource "aws_sqs_queue" "commentary_dlq" {
  name = "soccerize-commentary-dlq"
}

resource "aws_sqs_queue" "commentary_queue" {
  name                      = "soccerize-commentary-queue"
  visibility_timeout_seconds = 60 
  message_retention_seconds = 200
  delay_seconds             = 0
  receive_wait_time_seconds = 20
  max_message_size          = 262144

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.commentary_dlq.arn
    maxReceiveCount     = 3  # After 3 failures, send to DLQ
  })
}


