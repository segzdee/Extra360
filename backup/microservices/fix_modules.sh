#!/bin/bash

# Base project directory
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Ensure TypeScript configuration supports module resolution
cat > "$BASE_DIR/tsconfig.json" << 'CONFIG'
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./src",
    "paths": {
      "@services/*": ["services/*"],
      "@models/*": ["models/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
CONFIG

# Create a standard index file generator function
generate_index() {
  local dir="$1"
  local output="$dir/index.ts"
  
  # Find all TypeScript files in the directory
  files=$(find "$dir" -maxdepth 1 -name "*.ts" ! -name "index.ts")
  
  if [ -n "$files" ]; then
    echo "// Auto-generated index file" > "$output"
    for file in $files; do
      filename=$(basename "$file" .ts)
      echo "export * from './$filename';" >> "$output"
    done
  fi
}

# Generate index files for key directories
generate_index "$BASE_DIR/src/services/auth"
generate_index "$BASE_DIR/src/services/shift"
generate_index "$BASE_DIR/src/models"

# Create a universal error handling utility
cat > "$BASE_DIR/src/utils/errorHandler.ts" << 'ERROR_HANDLER'
export class ApplicationError extends Error {
  constructor(
    public message: string, 
    public code?: string, 
    public details?: any
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export const handleError = (error: Error) => {
  console.error('Application Error:', error.message);
  // Add logging, monitoring, or other error handling logic
};
ERROR_HANDLER

# Update package.json to include module resolution and error handling
cat > "$BASE_DIR/package.json" << 'PKG_JSON'
{
  "name": "extrastaff360-microservices",
  "version": "1.0.0",
  "scripts": {
    "start": "ts-node -r tsconfig-paths/register src/index.ts",
    "test": "jest",
    "build": "tsc"
  },
  "dependencies": {
    "tsconfig-paths": "^4.2.0"
  },
  "jest": {
    "moduleNameMapper": {
      "^@services/(.*)$": "<rootDir>/src/services/$1",
      "^@models/(.*)$": "<rootDir>/src/models/$1",
      "^@utils/(.*)$": "<rootDir>/src/utils/$1"
    }
  }
}
PKG_JSON

# Install additional resolving dependencies
npm install -D \
  tsconfig-paths \
  typescript

echo "Module resolution and error handling setup complete!"
