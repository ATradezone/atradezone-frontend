#!/bin/bash

# Initialize git repository
git init

# Add all files except those in .gitignore
git add .

# Make first commit
git commit -m "Initial commit"

# Rename branch to main
git branch -M main

# Add remote origin for backend repository
git remote add origin https://github.com/Deputee/atradezone-backend.git

# Push to GitHub
git push -u origin main

echo "Backend repository setup complete!"