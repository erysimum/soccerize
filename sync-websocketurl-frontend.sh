#!/bin/bash

# Path to your React app's .env file
ENV_FILE="./frontend/.env"

# Get the WebSocket URL from Terraform output
WS_URL=$(terraform -chdir=./infrastructure output -raw websocket_url)

# Check if WebSocket URL was retrieved
if [ -z "$WS_URL" ]; then
  echo " Failed to get WebSocket URL from Terraform output"
  exit 1
fi

# Write to .env
echo "VITE_SOCKET_URL=$WS_URL" > $ENV_FILE

echo " Synced WebSocket URL to $ENV_FILE"
cat $ENV_FILE

