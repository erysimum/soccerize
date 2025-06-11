#!/bin/bash

set -e

echo " Deleting KIND cluster: soccerize-cicd-cluster"
kind delete cluster --name soccerize-cicd-cluster

echo " Cluster deleted. Verifying..."
kubectl config get-clusters
