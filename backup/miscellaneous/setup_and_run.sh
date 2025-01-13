#!/bin/bash

# Step 1: Navigate to the app directory
cd ~/Desktop/extra360 || { echo "App directory not found!"; exit 1; }

echo "Starting application setup and testing..."

# Step 2: Export database environment variables
export DB_HOST=127.0.0.1
export DB_PORT=3306
export DB_NAME=extrastaff360
export DB_USER=segzdee
export DB_PASSWORD=kiyingi8844

echo "Database environment variables set."

# Step 3: Ensure MySQL is running
echo "Checking if MySQL is running..."
mysqladmin ping --socket=/opt/homebrew/var/mysql/mysql.sock > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "MySQL is not running. Please start it first."
    exit 1
fi
echo "MySQL is running."

# Step 4: Test database connection
echo "Testing database connection..."
mysql -u "$DB_USER" -p"$DB_PASSWORD" -h "$DB_HOST" -P "$DB_PORT" -e "USE $DB_NAME;" --socket=/opt/homebrew/var/mysql/mysql.sock
if [ $? -ne 0 ]; then
    echo "Database connection failed. Check your credentials or database status."
    exit 1
fi
echo "Database connection successful."

# Step 5: Install dependencies
echo "Installing dependencies..."
if [ -f package.json ]; then
    npm install
elif [ -f requirements.txt ]; then
    pip install -r requirements.txt
else
    echo "No package manager file found (package.json or requirements.txt)."
    exit 1
fi
echo "Dependencies installed."

# Step 6: Start the application
echo "Starting the application..."
if [ -f package.json ]; then
    npm start
elif [ -f manage.py ]; then
    python manage.py runserver
else
    echo "Cannot determine the application type. Ensure it has npm or Django setup."
    exit 1
fi

# Step 7: Output access information
echo "============================================================="
echo "The app should now be running locally."
echo "Access the following URLs in your browser to test:"
echo "  - Homepage: http://127.0.0.1:8000/"
echo "  - Login Page: http://127.0.0.1:8000/login"
echo "  - Other Pages: Replace with appropriate URLs for your app."
echo "============================================================="
