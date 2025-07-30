#!/bin/bash

set -e

echo " Switching to Terraform env"
cd "$(dirname "$0")/../infrastructure/envs/dev"

echo " Fetching Terraform outputs..."
export vpc_id=$(terraform output -raw vpc_id)
export subnet_a=$(terraform output -json private_subnets | jq -r '.[0]')
export subnet_b=$(terraform output -json private_subnets | jq -r '.[1]')
export ssh_key_name=$(terraform output -raw key_pair_name)

echo " VPC ID: $vpc_id"
echo " Subnet A: $subnet_a"
echo " Subnet B: $subnet_b"
echo " SSH Key Name: $ssh_key_name"

cd ../../eks-cluster

echo " Generating cluster-config.yml"
envsubst < cluster-config.tpl.yml > cluster-config.yml

echo " Generating nodegroup-config.yml"
envsubst < nodegroup-config.tpl.yml > nodegroup-config.yml

echo " Done. now we can run :"
echo "eksctl create cluster -f cluster-config.yml"
echo "eksctl create nodegroup -f nodegroup-config.yml"
