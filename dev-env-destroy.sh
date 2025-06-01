#!/bin/bash

echo " Infrastructure dir ..."
cd infrastructure || { echo " Failed to cd into infrastructure"; exit 1; }

echo " Want to destroy all AWS Resources?"
read -p "Are you sure? Type 'yes' to proceed: " confirm
if [ "$confirm" != "yes" ]; then
  echo " Destroy cancelled."
  exit 1
fi

echo " Running terraform destroy..."
terraform destroy -auto-approve

echo " ALL RESOURCES DESTROYED!!!"

