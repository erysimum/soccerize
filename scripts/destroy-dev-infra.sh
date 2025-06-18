#!/bin/bash

set -e

echo " Switching to dev environment directory..."
cd "$(dirname "$0")/../infrastructure/envs/dev"

echo " Running terraform destroy..."
terraform destroy -auto-approve

echo " Infrastructure destroyed successfully!"

