#!/bin/bash

# Set the repository name and branch
git_repo="Extra360"
branch="main"

echo "Starting security update process..."

# Step 1: Update package lists and upgrade security updates
sudo apt-get update -y
sudo apt-get upgrade -y --with-new-pkgs

if [ $? -eq 0 ]; then
  echo "System packages updated successfully."
else
  echo "Failed to update system packages." >&2
  exit 1
fi

# Step 2: Install additional security tools (optional, e.g., lynis, clamav)
sudo apt-get install -y lynis clamav
if [ $? -eq 0 ]; then
  echo "Security tools installed successfully."
else
  echo "Failed to install security tools." >&2
  exit 1
fi

# Step 3: Run a basic vulnerability scan (using lynis or similar tool)
lynis audit system > lynis-audit.log
if [ $? -eq 0 ]; then
  echo "Vulnerability scan completed. Logs saved to lynis-audit.log."
else
  echo "Vulnerability scan failed." >&2
fi

# Step 4: Self-healing: Check and fix common issues (e.g., permissions, services)
echo "Performing basic system checks and corrections..."
chmod -R 755 /var/www/html
service apache2 restart

if [ $? -eq 0 ]; then
  echo "System corrections applied successfully."
else
  echo "Failed to apply corrections." >&2
fi

# Step 5: Commit changes and push to Git repository
git add lynis-audit.log

git commit -m "Security updates and vulnerability fixes"
if [ $? -eq 0 ]; then
  echo "Changes committed successfully."
else
  echo "Git commit failed." >&2
  exit 1
fi

# Push changes to the repository
git push origin $branch
if [ $? -eq 0 ]; then
  echo "Changes pushed to $git_repo on branch $branch successfully."
else
  echo "Failed to push changes to the repository." >&2
  exit 1
fi

# Self-execution setup
chmod +x $0

# Schedule the script for periodic execution using crontab
echo "Setting up a cron job for periodic execution..."
(crontab -l; echo "0 2 * * * $(pwd)/$0") | crontab -

if [ $? -eq 0 ]; then
  echo "Cron job scheduled successfully."
else
  echo "Failed to schedule cron job." >&2
  exit 1
fi

echo "Security update process completed successfully!"
