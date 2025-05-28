#!/bin/bash

echo " Switching to infrastructure directory..."
cd infrastructure || exit 1

echo " Running terraform init + apply..."
terraform init -upgrade
terraform apply -auto-approve

echo " Extracting SQS and DynamoDB values from Terraform output..."
SQS_URL=$(terraform output -raw sqs_queue_url)
DYNAMO_TABLE=$(terraform output -raw dynamodb_table)
WEBSOCKET_URL=$(terraform output -raw websocket_url)  

cd ..

echo " Writing .env to backend-node/"
cat > backend-node/.env <<EOF
SQS_QUEUE_URL=$SQS_URL
TABLE_NAME=$DYNAMO_TABLE
EOF
echo " backend-node/.env"
cat backend-node/.env

# echo " Writing .env to lambda-commentary/"
# cat > lambda-commentary/.env <<EOF
# TABLE_NAME=$DYNAMO_TABLE
# EOF
# echo " lambda-commentary/.env"
# cat lambda-commentary/.env

echo " Writing .env to frontend/"
cat > frontend/.env <<EOF
VITE_SOCKET_URL=$WEBSOCKET_URL
EOF
echo " frontend/.env"
cat frontend/.env
