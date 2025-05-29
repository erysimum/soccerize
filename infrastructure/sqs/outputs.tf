output "sqs_queue_url" {
  value = aws_sqs_queue.commentary_queue.id
}

output "sqs_commentary_queue_arn" {
  value = aws_sqs_queue.commentary_queue.arn
}