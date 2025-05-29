#LAMBDA FUNCTION
resource "aws_lambda_function" "commentary_lambda" {
  function_name = "soccerize-commentary"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = var.role_commentary_lambda

  filename         = "${path.module}/../../lambda-functions/commentary/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../../lambda-functions/commentary/lambda.zip")


  environment {
    variables = {
      TABLE_NAME = var.commentary_table_name
    }
  }
}
#LAMBDA EVENT SOURCE MAPPING
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = var.commentary_queue_arn
  function_name    = aws_lambda_function.commentary_lambda.arn
  batch_size       = 1
  enabled          = true

 
  //depends_on = [var.role_commentary_lambda]

}