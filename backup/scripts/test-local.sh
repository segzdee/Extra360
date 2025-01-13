#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# Implement quantum testing matrix
declare -A test_matrix=(
    ["unit"]="docker-compose run --rm frontend npm test"
    ["integration"]="docker-compose -f docker-compose.test.yml up --exit-code-from tests"
    ["e2e"]="docker-compose -f docker-compose.e2e.yml up --exit-code-from e2e"
)

execute_quantum_tests() {
    local test_type="$1"
    local command="${test_matrix[$test_type]}"
    
    echo "Executing $test_type tests..."
    if ! eval "$command"; then
        echo "Error: $test_type tests failed"
        return 1
    fi
}

main() {
    echo "Initializing quantum test matrix..."
    
    for test_type in "${!test_matrix[@]}"; do
        if ! execute_quantum_tests "$test_type"; then
            exit 1
        fi
    done
    
    echo "All tests passed successfully"
}

main "$@"
