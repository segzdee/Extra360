#!/bin/bash

# Navigate to project directory
cd /Users/meddie/Desktop/Extra360

# Configure Git
git config user.name "segzdee"
git config user.email "segzdeee@gmail.com"

# Initialize Git Repository
git init

# Create .gitignore
cat > .gitignore << 'EOL'
# Dependencies
node_modules/
vendor/
.next
.DS_Store

# Environment files
.env
.env.local
.env.*

# Build directories
dist/
build/
.next/

# IDE and Editor files
.idea/
.vscode/
*.swp
*.swo

# Logs and databases
*.log
*.sqlite
*.sqlite3

# Docker
docker-compose.override.yml
/docker/data/

# Reference directories
reference/
EOL

# Create comprehensive README.md
cat > README.md << 'EOL'
# ExtraStaff360 Platform

A comprehensive staffing solution for the hospitality industry.

## Project Structure
- `frontend/`: Next.js frontend application
- `backend/`: PHP/Laravel backend services
- `bridge/`: API gateway service
- `infrastructure/`: Infrastructure configuration
- `deployment/`: Deployment scripts and configurations

## Setup Instructions
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run docker-compose up

## Development
- Frontend: http://localhost:3000
- Backend: http://localhost:9000
- Bridge: http://localhost:4000

## Architecture
Three-tier architecture with:
- Client Dashboard
- Staff Dashboard
- Agency Dashboard
- SuperAdmin Dashboard
EOL

# Clone and set up frontend
rm -rf frontend
git clone https://github.com/coreui/coreui-free-react frontend
cd frontend
rm -rf .git
cd ..

# Clone reference portal
rm -rf reference
git clone https://github.com/ml2325/JobPortal.git reference
cd reference
rm -rf .git
cd ..

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial Commit: Extra360 Setup
- Initialized project structure
- Integrated CoreUI React template
- Added JobPortal reference
- Set up Docker configuration
- Configured development environment"

# Add GitHub remote and push
git remote add origin https://github.com/segzdee/Extra360.git
git branch -M main
git push -u origin main

# Docker login and setup
docker login --username extrastaff360 --password "Kakembo@Ssegujja8844"

# Create and start Docker containers
docker-compose down
docker-compose up -d --build

# Print status information
echo "Repository setup complete!"
echo "GitHub Repository: https://github.com/segzdee/Extra360"
docker-compose ps

# Print next steps
echo "
Next Steps:
1. Review the GitHub repository at https://github.com/segzdee/Extra360
2. Check Docker containers status above
3. Access the applications at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:9000
   - Bridge: http://localhost:4000
"
