#!/bin/bash

set -e  # Exit on error

echo " Switching to dev environment"
cd "$(dirname "$0")/../infrastructure/envs/dev"

echo " Initializing Terraform to provision EC2 as bastion host"
terraform init -upgrade

echo " Applying infrastructure on AWS"
terraform apply -auto-approve

echo " Infra provisioned! Fetching outputs..."

# Capture output
BASTION_IP=$(terraform output -raw bastion_public_ip)

echo ""
echo ""
echo " Bastion EC2 Public IP==>>: $BASTION_IP"
echo " Connect to our Bastion via SSH into it:"
echo "ssh -i ~/projects/soccerize/terra-key ubuntu@$BASTION_IP"

