output "role_commentary_lambda" {
  value = aws_iam_role.lambda_role.arn
}

output "role_ws_connect_lambda" {
  value = aws_iam_role.lambda_ws_connect_role.arn
}

output "role_ws_disconnect_lambda" {
  value = aws_iam_role.lambda_ws_disconnect_role.arn
}

output "role_broadcast_lambda" {
  value = aws_iam_role.lambda_broadcast_stream_role.arn
}