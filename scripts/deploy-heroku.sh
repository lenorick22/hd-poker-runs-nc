#!/bin/bash

# HD Poker Runs NC - Heroku Deployment Script
# This script automates the Heroku deployment process

set -e  # Exit on any error

echo "🏍️  HD Poker Runs NC - Heroku Deployment"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    print_error "Heroku CLI not found. Please install it first:"
    echo "  macOS: brew install heroku/brew/heroku"
    echo "  Other: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

print_success "Heroku CLI found"

# Check if user is logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    print_warning "Not logged in to Heroku"
    print_status "Opening Heroku login..."
    heroku login
fi

print_success "Logged in to Heroku as $(heroku auth:whoami)"

# Get app name from user
echo
read -p "Enter your Heroku app name (or press Enter for auto-generated): " APP_NAME

if [ -z "$APP_NAME" ]; then
    print_status "Creating Heroku app with auto-generated name..."
    APP_NAME=$(heroku create --json | jq -r '.name')
else
    print_status "Creating Heroku app: $APP_NAME"
    heroku create "$APP_NAME"
fi

print_success "Created Heroku app: $APP_NAME"

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)
print_status "Generated JWT secret"

# Set environment variables
print_status "Setting environment variables..."
heroku config:set NODE_ENV=production --app "$APP_NAME"
heroku config:set JWT_SECRET="$JWT_SECRET" --app "$APP_NAME"
heroku config:set FRONTEND_URL="https://$APP_NAME.herokuapp.com" --app "$APP_NAME"

# Ask about MongoDB
echo
echo "Database Setup Options:"
echo "1. Use MongoDB Atlas (recommended - free tier available)"
echo "2. Use Heroku MongoDB add-on (paid)"
echo "3. I'll configure MongoDB URI manually later"
echo
read -p "Choose option (1-3): " DB_OPTION

case $DB_OPTION in
    1)
        print_warning "Please set up MongoDB Atlas manually:"
        echo "  1. Go to https://mongodb.com/atlas"
        echo "  2. Create a free cluster"
        echo "  3. Create a database user"
        echo "  4. Get the connection string"
        echo "  5. Run: heroku config:set MONGODB_URI='your-connection-string' --app $APP_NAME"
        ;;
    2)
        print_status "Adding MongoDB Atlas add-on..."
        heroku addons:create mongolab:sandbox --app "$APP_NAME"
        print_success "MongoDB add-on added"
        ;;
    3)
        print_warning "Remember to set MONGODB_URI later:"
        echo "  heroku config:set MONGODB_URI='your-mongodb-uri' --app $APP_NAME"
        ;;
esac

# Add git remote if it doesn't exist
if ! git remote get-url heroku &> /dev/null; then
    print_status "Adding Heroku git remote..."
    heroku git:remote -a "$APP_NAME"
    print_success "Heroku remote added"
fi

# Deploy to Heroku
print_status "Deploying to Heroku..."
echo "This may take a few minutes..."

if git push heroku main; then
    print_success "Deployment successful!"
    
    # Open the app
    echo
    echo "🎉 Your app is now live at: https://$APP_NAME.herokuapp.com"
    echo
    read -p "Open the app in your browser? (y/n): " OPEN_APP
    
    if [[ $OPEN_APP == "y" || $OPEN_APP == "Y" ]]; then
        heroku open --app "$APP_NAME"
    fi
    
    # Show useful commands
    echo
    echo "📋 Useful commands:"
    echo "  View logs:    heroku logs --tail --app $APP_NAME"
    echo "  Open app:     heroku open --app $APP_NAME"
    echo "  Check config: heroku config --app $APP_NAME"
    echo "  Scale app:    heroku ps:scale web=1 --app $APP_NAME"
    
else
    print_error "Deployment failed!"
    print_warning "Check the error messages above and try:"
    echo "  heroku logs --tail --app $APP_NAME"
    exit 1
fi

print_success "Deployment script completed!"