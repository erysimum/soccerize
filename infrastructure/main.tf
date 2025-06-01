module "sqs" {
  source = "./sqs"
}

module "dynamodb" {
  source = "./dynamodb"
  
}

module "iam" {
  source = "./iam"
  commentary_table_arn   = module.dynamodb.commentary_table_arn
  websocket_table_arn    = module.dynamodb.websocket_table_arn
  commentary_queue_arn   = module.sqs.sqs_commentary_queue_arn
  broadcast_stream       = module.dynamodb.commentary_table_stream_arn
  region                 = "us-east-1"
}


module "provisioning_lambda" {
  source                     = "./provisioning-lambda" 
  commentary_table_name      = module.dynamodb.dynamodb_commentary_table_name
  websocket_table_name       = module.dynamodb.dynamodb_websocket_table_name
  commentary_queue_arn       = module.sqs.sqs_commentary_queue_arn
  broadcast_stream           = module.dynamodb.commentary_table_stream_arn
  role_commentary_lambda     = module.iam.role_commentary_lambda
  role_ws_connect_lambda     = module.iam.role_ws_connect_lambda
  role_ws_disconnect_lambda  = module.iam.role_ws_disconnect_lambda
  role_broadcast_lambda      = module.iam.role_broadcast_lambda
  websocket_endpoint_for_lambda  = module.api_gateway.websocket_endpoint_for_lambda
  websocket_url_for_frontend  = module.api_gateway.websocket_url_for_frontend
  region                     = "us-east-1"
}

module "api_gateway" {
  source               = "./api_gateway"
  region               =  var.region
  lambda_ws_connect_arn    = module.provisioning_lambda.lambda_ws_connect_arn
  lambda_ws_disconnect_arn = module.provisioning_lambda.lambda_ws_disconnect_arn
}
