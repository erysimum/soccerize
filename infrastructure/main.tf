module "sqs" {
  source = "./sqs"
}

module "dynamodb" {
  source = "./dynamodb"
}

module "iam" {
  source = "./iam"
}

module "provisioning_lambda" {
  source = "./provisioning-lambda"
}

module "api_gateway" {
  source = "./api_gateway"
}
