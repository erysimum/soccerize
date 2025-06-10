#!/bin/bash

source "$(dirname "$0")/dockerhubcreds.env"
FRONTEND_IMAGE="soccerize-frontend"
BACKEND_IMAGE="soccerize-backend-node"

echo " Building images via Docker Compose..."
docker compose -f ../docker-compose.dev.yml  build

echo "Logging to dockerhub..."
echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

echo "Tagging images for Docker Hub..."
docker tag $FRONTEND_IMAGE:latest $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:v1.0.0
docker tag $BACKEND_IMAGE:latest $DOCKERHUB_USERNAME/$BACKEND_IMAGE:v1.0.0


echo " Pushing to Docker Hub..."
docker push $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:v1.0.0
docker push $DOCKERHUB_USERNAME/$BACKEND_IMAGE:v1.0.0

echo "images being pushed to dockerhub...."

