#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== Setting up Python Virtual Environment ===${NC}"

# Go to project root
cd Extra360

# Create virtual environment
echo -e "\n${BLUE}Creating virtual environment...${NC}"
python3 -m venv venv

# Activate virtual environment
echo -e "\n${BLUE}Activating virtual environment...${NC}"
source venv/bin/activate

# Install dependencies
echo -e "\n${BLUE}Installing dependencies...${NC}"
pip install fastapi uvicorn python-multipart aiofiles

# Create project structure if it doesn't exist
echo -e "\n${BLUE}Setting up project structure...${NC}"
mkdir -p backend/static
mkdir -p backend/src/{controllers,models,services}

# Create requirements file
echo -e "\n${BLUE}Creating requirements.txt...${NC}"
cat > backend/requirements.txt << 'EOL'
fastapi==0.109.0
uvicorn==0.27.0
python-multipart==0.0.6
aiofiles==23.2.1
EOL

# Create main application file
echo -e "\n${BLUE}Creating main.py...${NC}"
cat > backend/main.py << 'EOL'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI(title="Extra360 Platform")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
EOL

# Create basic static HTML file
echo -e "\n${BLUE}Creating index.html...${NC}"
cat > backend/static/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Extra360 Platform</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Extra360</h1>
        <p>Backend system is running successfully.</p>
    </div>
</body>
</html>
EOL

# Create activation script
echo -e "\n${BLUE}Creating activation script...${NC}"
cat > activate.sh << 'EOL'
#!/bin/bash
source venv/bin/activate
cd backend
echo "Virtual environment activated! You can now run: python main.py"
EOL

chmod +x activate.sh

echo -e "\n${GREEN}Setup completed successfully!${NC}"
echo -e "\nTo start the application:"
echo -e "1. ${BLUE}./activate.sh${NC} (to activate the virtual environment)"
echo -e "2. ${BLUE}python main.py${NC} (to start the server)"
echo -e "\nThe server will be available at: http://localhost:8000"
