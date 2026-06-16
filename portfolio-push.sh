#!/bin/bash

# Portfolio Auto-Push Script
REPO_DIR="/Users/anchithyaprabhakar/Portfolio"
LOG_FILE="/Users/anchithyaprabhakar/portfolio-push.log"

# Navigate to repository
cd "$REPO_DIR" || exit 1

# Add timestamp to log
echo "=== Portfolio Push at $(date) ===" >> "$LOG_FILE"

# Check if there are changes
if [[ -z $(git status -s) ]]; then
    echo "No changes to commit" >> "$LOG_FILE"
    exit 0
fi

# Stage all changes
git add . >> "$LOG_FILE" 2>&1

# Commit with timestamp
git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE" 2>&1

# Push to origin
git push origin main >> "$LOG_FILE" 2>&1

echo "Push completed successfully" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
