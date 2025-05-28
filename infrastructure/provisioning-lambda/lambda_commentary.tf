#LAMBDA FUNCTION
resource "aws_lambda_function" "commentary_lambda" {
  function_name = "soccerize-commentary"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.lambda_role.arn

  filename         = "${path.module}/../../lambda-functions/commentary/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../../lambda-functions/commentary/lambda.zip")


  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.commentary_table.name
    }
  }
}
#LAMBDA EVENT SOURCE MAPPING
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.commentary_queue.arn
  function_name    = aws_lambda_function.commentary_lambda.arn
  batch_size       = 1
  enabled          = true

  depends_on = [
  aws_iam_role_policy_attachment.lambda_attach_policy
]
}