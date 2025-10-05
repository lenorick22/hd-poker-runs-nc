#!/bin/bash

echo "🔍 HD Poker Runs NC - Structure Validation Test"
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}Testing Backend Structure...${NC}"

# Test backend files
backend_files=(
    "backend/server.js"
    "backend/package.json" 
    "backend/.env"
    "backend/models/User.js"
    "backend/models/Event.js"
    "backend/routes/auth.js"
    "backend/routes/events.js"
    "backend/routes/participants.js"
    "backend/middleware/auth.js"
)

for file in "${backend_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ✅ $file ${GREEN}[EXISTS]${NC}"
    else
        echo -e "  ❌ $file ${RED}[MISSING]${NC}"
    fi
done

echo -e "\n${BLUE}Testing Frontend Structure...${NC}"

# Test frontend files
frontend_files=(
    "frontend/package.json"
    "frontend/public/index.html"
    "frontend/src/index.js"
    "frontend/src/App.js"
    "frontend/src/contexts/AuthContext.js"
    "frontend/src/services/authService.js"
    "frontend/src/components/Navbar.js"
    "frontend/src/components/Footer.js"
    "frontend/src/pages/Home.js"
    "frontend/src/pages/Events.js"
)

for file in "${frontend_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ✅ $file ${GREEN}[EXISTS]${NC}"
    else
        echo -e "  ❌ $file ${RED}[MISSING]${NC}"
    fi
done

echo -e "\n${BLUE}Testing Configuration Files...${NC}"

# Test config files
config_files=(
    "package.json"
    "README.md"
    "Dockerfile"
    "docker-compose.yml"
)

for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ✅ $file ${GREEN}[EXISTS]${NC}"
    else
        echo -e "  ❌ $file ${RED}[MISSING]${NC}"
    fi
done

echo -e "\n${BLUE}API Route Structure Test...${NC}"

# Check if API routes are properly defined
if grep -q "app.use('/api/auth'" backend/server.js; then
    echo -e "  ✅ Auth routes ${GREEN}[CONFIGURED]${NC}"
else
    echo -e "  ❌ Auth routes ${RED}[MISSING]${NC}"
fi

if grep -q "app.use('/api/events'" backend/server.js; then
    echo -e "  ✅ Events routes ${GREEN}[CONFIGURED]${NC}"
else
    echo -e "  ❌ Events routes ${RED}[MISSING]${NC}"
fi

if grep -q "app.use('/api/participants'" backend/server.js; then
    echo -e "  ✅ Participants routes ${GREEN}[CONFIGURED]${NC}"
else
    echo -e "  ❌ Participants routes ${RED}[MISSING]${NC}"
fi

echo -e "\n${GREEN}🎉 Structure validation complete!${NC}"
echo -e "${BLUE}📁 Total files created: $(find . -name "*.js" -o -name "*.json" -o -name "*.css" -o -name "*.html" -o -name "*.md" | wc -l | tr -d ' ')${NC}"
echo -e "${BLUE}🚀 Application is ready for development and testing!${NC}"