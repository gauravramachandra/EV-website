#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

# Seed the database after successful build
echo "Database will be automatically seeded when server starts..."
