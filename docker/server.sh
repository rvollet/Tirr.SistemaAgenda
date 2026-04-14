#!/bin/bash
set -e

# ======================
# Variáveis
# ======================
PROJECT_NAME="tirr-agenda-servico"
IMAGE_NAME="drg/${PROJECT_NAME}"
TAG="${TAG:-latest}"
PLATFORM="${PLATFORM:-linux/amd64}"
PORT="${PORT:-3001}"

# ECR (obrigatório se for fazer push)
# ECR_IMAGE="179095145246.dkr.ecr.sa-east-1.amazonaws.com/drg/${PROJECT_NAME}"

# ======================
# Build do projeto
# ======================
echo "🚀 Buildando projeto..."
yarn build

# ======================
# Build da imagem Docker
# ======================
echo "🐳 Buildando imagem Docker..."
docker build \
  --no-cache \
  --platform "$PLATFORM" \
  -f docker/Dockerfile \
  -t "$IMAGE_NAME:$TAG" \
  .

# ======================
# Tag + Push (opcional)
# ======================
if [ -n "$ECR_IMAGE" ]; then
  echo "🏷️ Tag da imagem para ECR..."
  docker tag "$IMAGE_NAME:$TAG" "$ECR_IMAGE:$TAG"

  echo "📤 Push para o ECR..."
  docker push "$ECR_IMAGE:$TAG"
fi

# ======================
# Container local
# ======================
if docker ps -a --format '{{.Names}}' | grep -q "^${PROJECT_NAME}$"; then
  echo "🛑 Parando container existente..."
  docker stop "$PROJECT_NAME"
  docker rm "$PROJECT_NAME"
fi

echo "▶️ Criando novo container..."
docker create \
  --name "$PROJECT_NAME" \
  -p "$PORT:$PORT" \
  "$IMAGE_NAME:$TAG"

docker start "$PROJECT_NAME"

echo "✅ Deploy finalizado com sucesso!"
