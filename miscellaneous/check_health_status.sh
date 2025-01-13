#!/bin/bash

# Define container names
containers=("extra360-bridge-1" "extra360-backend-1" "extra360-frontend-1")

echo "-----------------------------------------"
echo "Checking health status for containers..."
echo "-----------------------------------------"

# Loop through each container and check health status
for container in "${containers[@]}"; do
    echo "Container: $container"
    
    # Check if the container exists
    if docker ps --format "{{.Names}}" | grep -q "^$container$"; then
        # Inspect health status
        health_status=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null)
        
        # Handle different health statuses
        if [ $? -eq 0 ]; then
            echo "Health Status: $health_status"
            if [ "$health_status" == "healthy" ]; then
                echo "✅ $container is healthy."
            elif [ "$health_status" == "unhealthy" ]; then
                echo "⚠️  $container is unhealthy. Check logs for details."
            else
                echo "🔄 $container is still initializing."
            fi
        else
            echo "Health check not configured for this container."
        fi
    else
        echo "❌ Container not found or not running."
    fi
    echo "-----------------------------------------"
done

echo "Health check completed."
