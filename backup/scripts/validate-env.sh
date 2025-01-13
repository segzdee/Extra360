#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# Configuration validation matrix
declare -A validation_matrix=(
    ["NODE_ENV"]="production"
    ["POSTGRES_USER"]="^[a-zA-Z][a-zA-Z0-9_]*$"
    ["POSTGRES_PASSWORD"]="^.{8,}$"
    ["POSTGRES_DB"]="^[a-zA-Z][a-zA-Z0-9_]*$"
    ["DATABASE_URL"]="^postgresql://.*"
    ["REDIS_URL"]="^redis://.*"
    ["BRIDGE_PORT"]="^[0-9]+$"
    ["BACKEND_URL"]="^http(s)?://.*"
)

# Validation function with regex pattern matching
validate_env_var() {
    local var_name="$1"
    local pattern="$2"
    local var_value
    
    var_value=$(grep "^${var_name}=" .env | cut -d'=' -f2-)
    
    if [[ -z "$var_value" ]]; then
        echo "Error: Missing required environment variable: ${var_name}"
        return 1
    fi
    
    if ! [[ "$var_value" =~ $pattern ]]; then
        echo "Error: Invalid format for ${var_name}"
        return 1
    fi
}

# Main validation loop with error aggregation
main() {
    local error_count=0
    
    echo "Starting environment validation..."
    
    for var in "${!validation_matrix[@]}"; do
        if ! validate_env_var "$var" "${validation_matrix[$var]}"; then
            ((error_count++))
        fi
    done
    
    if [[ $error_count -gt 0 ]]; then
        echo "Validation failed with ${error_count} errors"
        exit 1
    fi
    
    echo "Environment validation successful"
}

main "$@"
