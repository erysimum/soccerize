#!/bin/bash

echo " Switching to infrastructure directory..."
cd infrastructure || { echo " Failed to cd into infrastructure"; exit 1; }

echo " You are about to destroy all Terraform-managed AWS resources!"
read -p "Are you sure? Type 'yes' to proceed: " confirm
if [ "$confirm" != "yes" ]; then
  echo " Destroy cancelled."
  exit 1
fi

echo " Running terraform destroy..."
terraform destroy -auto-approve

echo " All resources destroyed!"

