# Harley Davidson Poker Runs - North Carolina

A full-stack web application for managing and participating in Harley Davidson motorcycle poker runs throughout North Carolina.

## 🏍️ Features

- **Event Management**: Create, manage, and view poker run events
- **User Registration**: Secure user authentication and profile management
- **Event Registration**: Easy registration for poker run events
- **Participant Management**: Track participants, bikes, and emergency contacts
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live event updates and notifications
- **Payment Integration**: Registration fee handling
- **Route Mapping**: Interactive maps showing event routes and stops

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hd-poker-runs-nc
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hd-poker-runs
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service (macOS with Homebrew)
   brew services start mongodb-community

   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6.0
   ```

5. **Run the application**
   ```bash
   # Start both frontend and backend in development mode
   npm run dev

   # Or start individually
   npm run dev:backend  # Backend only (port 5000)
   npm run dev:frontend # Frontend only (port 3000)
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 🏗️ Project Structure

```
hd-poker-runs-nc/
├── backend/                 # Express.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & validation middleware
│   ├── utils/              # Helper utilities
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── services/       # API service functions
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Frontend utilities
│   └── public/             # Static assets
├── deployment/             # Deployment configurations
├── docs/                   # Project documentation
└── database/               # Database scripts and schemas
```

## 🔧 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Email**: Nodemailer

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **UI Components**: Styled Components
- **Maps**: React Leaflet
- **Date Handling**: date-fns
- **Notifications**: React Toastify

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Process Management**: PM2
- **Monitoring**: Health checks and logging

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Event Endpoints
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (Admin/Organizer)
- `PUT /api/events/:id` - Update event (Admin/Organizer)
- `DELETE /api/events/:id` - Delete event (Admin/Organizer)

### Participant Endpoints
- `POST /api/participants/register/:eventId` - Register for event
- `DELETE /api/participants/unregister/:eventId` - Unregister from event
- `GET /api/participants/my-events` - Get user's registered events
- `PUT /api/participants/update/:eventId` - Update registration info

## 🐳 Docker Deployment

### Production Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Application: http://localhost
   - API: http://localhost/api

### Development with Docker

```bash
docker-compose --profile dev up -d
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- CORS protection
- Helmet security headers
- Input validation and sanitization
- SQL injection protection (NoSQL)
- XSS protection

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests
```bash
npm test
```

## 🚀 Quick Deploy

### One-Click Deployments

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/your-username/hd-poker-runs-nc)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-username/hd-poker-runs-nc)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/your-username/hd-poker-runs-nc)

### Automated Deployment Script

For Heroku deployment, use our automated script:

```bash
# Make sure you have Heroku CLI installed
brew install heroku/brew/heroku

# Run the deployment script
./scripts/deploy-heroku.sh
```

### Manual Deployment Options

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guides including:**
- Heroku (free tier available)
- Railway (modern, fast)
- Vercel (serverless)
- DigitalOcean App Platform
- Docker + VPS (full control)

### Quick Setup for Development

```bash
# Clone and setup
git clone https://github.com/your-username/hd-poker-runs-nc.git
cd hd-poker-runs-nc
npm run install:all

# Copy environment template
cp .env.example backend/.env
# Edit backend/.env with your values

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Run the application
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=your-frontend-url
EMAIL_HOST=your-email-smtp-host
EMAIL_PORT=587
EMAIL_USER=your-email-username
EMAIL_PASS=your-email-password
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email john@example.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time chat during events
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications system
- [ ] Social media integration
- [ ] Weather integration for event planning
- [ ] Photo sharing and galleries

---

**Built with ❤️ for the Harley Davidson community in North Carolina**