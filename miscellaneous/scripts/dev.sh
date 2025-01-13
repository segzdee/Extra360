#!/bin/bash
# Start all services in development mode
echo "Starting Extrastaff360 services..."

# Start Frontend
cd ../FRONTEND && npm start &

# Start Backend
cd ../BACKEND && npm run dev &

# Start Microservices
cd ../microservices && npm run dev &

wait
