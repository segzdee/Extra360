#!/bin/bash

# Strict mode with advanced error handling
set -euo pipefail
IFS=$'\n\t'

# Dynamic path resolution
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$(cd "${SCRIPT_DIR}" && pwd)"
OUTPUT_DIR="${TARGET_DIR}/analysis_output"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
LOGFILE="${OUTPUT_DIR}/analysis_${TIMESTAMP}.log"

# Advanced error handling with call stack
trap 'handle_error $? ${LINENO} ${BASH_SOURCE[0]}' ERR
handle_error() {
    local exit_code=$1
    local line_number=$2
    local script_name=$3
    echo "Error occurred in ${script_name} at line ${line_number} (exit code: ${exit_code})" >&2
    exit "${exit_code}"
}

# Initialize with filesystem checks
init() {
    mkdir -p "${OUTPUT_DIR}"
    # Validate write permissions
    if [[ ! -w "${OUTPUT_DIR}" ]]; then
        echo "Error: Cannot write to ${OUTPUT_DIR}" >&2
        exit 1
    fi
}

# Execute core analysis
main() {
    init
    echo "Beginning analysis of ${TARGET_DIR}"
    echo "Results will be saved to ${OUTPUT_DIR}"
    
    # Basic filesystem analysis
    find "${TARGET_DIR}" -type f -not -path '*/\.*' \
        -exec file {} \; | sort > "${OUTPUT_DIR}/file_inventory.txt"
    
    # Directory structure analysis
    tree -a -I "node_modules|.git|dist|build" "${TARGET_DIR}" \
        > "${OUTPUT_DIR}/directory_structure.txt" 2>/dev/null || \
        find "${TARGET_DIR}" -type d -not -path '*/\.*' \
            -print > "${OUTPUT_DIR}/directory_structure.txt"
    
    echo "Analysis complete. Check ${OUTPUT_DIR} for results."
}

main "$@"
