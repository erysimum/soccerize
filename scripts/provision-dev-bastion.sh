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
export vpc_id=$(terraform output -raw vpc_id)
export subnet_a=$(terraform output -json private_subnets | jq -r '.[0]')
export subnet_b=$(terraform output -json private_subnets | jq -r '.[1]')
export bastion_ip=$(terraform output -raw bastion_public_ip)
export ssh_key_name=$(terraform output -raw key_pair_name)
#BASTION_IP=$(terraform output -raw bastion_public_ip)

cd ../../eks-cluster
echo " Generating cluster-config.yml..."
envsubst < cluster-config.tpl.yml > cluster-config.yml

echo " Generating nodegroup-config.yml..."
envsubst < nodegroup-config.tpl.yml > nodegroup-config.yml



echo " cluster-config.yml is generated..."
cat cluster-config.yml
echo " VPC ID: $vpc_id"
echo " Subnet A: $subnet_a"
echo " Subnet B: $subnet_b"
echo " Key name":$ssh_key_name
echo " Bastion IP=>: $bastion_ip"
echo ""
echo ""

echo " Connect to our Bastion via SSH into it:"
echo "ssh -i ~/projects/soccerize/terra-key ubuntu@$bastion_ip"

