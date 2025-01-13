#!/bin/bash

# Enhanced Metrics and Analysis System for Extrastaff360
# Version: 1.0.0
# Implementation Date: 2025-01-07

set -euo pipefail

# Terminal output configuration
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Core system paths
PROJECT_ROOT="/Users/meddie/Desktop/Extrastaff360"
ANALYSIS_DIR="${PROJECT_ROOT}/analysis_outputs"

# Function: Display and analyze recent reports
analyze_reports() {
    echo -e "${BLUE}Analyzing generated reports...${NC}"
    
    # Find most recent reports
    local arch_report=$(ls -t "${ANALYSIS_DIR}/architecture/"*.md | head -n 1)
    local impl_report=$(ls -t "${ANALYSIS_DIR}/reports/"*.md | head -n 1)
    
    if [[ -f "$arch_report" ]]; then
        echo -e "\n${GREEN}Architecture Analysis Report:${NC}"
        cat "$arch_report"
    fi
    
    if [[ -f "$impl_report" ]]; then
        echo -e "\n${GREEN}Implementation Analysis Report:${NC}"
        cat "$impl_report"
    fi
}

# Function: Analyze component-specific metrics
analyze_component_metrics() {
    echo -e "\n${BLUE}Analyzing component-specific metrics...${NC}"
    
    local components=("FRONTEND" "BACKEND" "microservices")
    
    for component in "${components[@]}"; do
        echo -e "\n${GREEN}${component} Analysis:${NC}"
        
        # Size metrics
        local size=$(du -sh "${PROJECT_ROOT}/${component}" 2>/dev/null | cut -f1)
        echo "Size: ${size:-N/A}"
        
        # File count metrics
        local file_count=$(find "${PROJECT_ROOT}/${component}" -type f 2>/dev/null | wc -l)
        echo "Total Files: ${file_count}"
        
        # TypeScript metrics
        if [[ -d "${PROJECT_ROOT}/${component}" ]]; then
            local ts_files=$(find "${PROJECT_ROOT}/${component}" -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)
            echo "TypeScript Files: ${ts_files}"
            
            # Package analysis
            if [[ -f "${PROJECT_ROOT}/${component}/package.json" ]]; then
                echo "Dependencies:"
                cat "${PROJECT_ROOT}/${component}/package.json" | grep -A 10 '"dependencies":'
            fi
        fi
    done
}

# Function: Advanced system metrics
analyze_advanced_metrics() {
    echo -e "\n${BLUE}Analyzing advanced system metrics...${NC}"
    
    # Git metrics (if available)
    if [[ -d "${PROJECT_ROOT}/.git" ]]; then
        echo -e "\n${GREEN}Git Statistics:${NC}"
        cd "${PROJECT_ROOT}"
        echo "Total Commits: $(git rev-list --count HEAD 2>/dev/null || echo 'N/A')"
        echo "Recent Activity: "
        git log --pretty=format:"%h - %an, %ar : %s" --since=7.days 2>/dev/null || echo "No recent commits"
    fi
    
    # Code complexity metrics
    echo -e "\n${GREEN}Code Complexity Analysis:${NC}"
    find "${PROJECT_ROOT}" -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -exec wc -l {} \; | sort -nr | head -n 10
}

# Main execution
main() {
    echo -e "${BLUE}Initiating enhanced metrics analysis...${NC}"
    
    analyze_reports
    analyze_component_metrics
    analyze_advanced_metrics
    
    echo -e "\n${GREEN}Enhanced analysis completed successfully.${NC}"
}

# Execute with error handling
if ! main; then
    echo -e "${RED}Error: Analysis failed to complete${NC}"
    exit 1
fi
