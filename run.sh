#!/bin/bash
set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 gitea|github branch repo_url commit_message"
  exit 1
fi

TARGET="$1"
BRANCH="$2"
REPO_URL="$3"
COMMIT_MSG="$4"

case "$TARGET" in
  gitea)
    USERNAME="iaboudou"
    EMAIL="ilyassaboudou07@gmail.com"
    ;;
  github)
    USERNAME="AboudouIlyass"
    EMAIL="ilyassaboudou@gmail.com"
    ;;
  *)
    echo "Erreur: first argument should be 'gitea' or 'github'"
    exit 1
    ;;
esac

git config --global credential.helper store || true

if [ ! -d ".git" ]; then
  git init
fi

git checkout -B "$BRANCH"

if [ -n "$(git status --porcelain)" ]; then
  git add .
  git -c user.name="$USERNAME" -c user.email="$EMAIL" commit -m "$COMMIT_MSG"
fi

git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

git -c user.name="$USERNAME" -c user.email="$EMAIL" push -u origin "$BRANCH" --force

echo "✅ Push done for $TARGET in branche $BRANCH"