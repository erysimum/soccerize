#!/bin/bash

set -e

echo " Deleting KIND cluster: soccerize-kind-cluster"
kind delete cluster --name soccerize-kind-cluster

echo " Cluster deleted. Verifying..."
kubectl config get-clusters
