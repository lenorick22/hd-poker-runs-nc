# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core Application Architecture

This is a full-stack MERN application (MongoDB, Express, React, Node.js) for managing Harley Davidson poker runs in North Carolina. The architecture follows a monorepo pattern with separate frontend and backend packages.

### Key Design Patterns

- **Monorepo Structure**: Root package.json coordinates frontend/backend with npm workspaces
- **Context-Based State Management**: React Context + useReducer for auth and global state (no Redux)
- **Service Layer Architecture**: Backend routes delegate to service functions, frontend uses service modules
- **Mongoose ODM**: Rich schema definitions with virtuals, methods, and proper indexing
- **JWT Authentication**: Stateless auth with role-based access (participant/organizer/admin)

### Data Model Architecture

The application centers around three main entities with complex relationships:

**User Model**: Comprehensive motorcycle rider profiles with:
- Nested schemas for bike info and emergency contacts
- Role-based permissions (participant/organizer/admin)
- Riding statistics tracking and preferences
- Virtual methods for public profiles and address formatting

**Event Model**: Complex poker run events with:
- Embedded participants array (not separate collection)
- Geospatial indexing for location-based queries
- Stop management with coordinates and requirements
- Virtual fields for participant count and registration status

**Participant Registration**: Handled as embedded documents within events, not separate collections. This denormalized approach optimizes for read performance during event management.

## Essential Commands

### Development Setup
```bash
# Install all dependencies (root, frontend, backend)
npm run install:all

# Start both frontend and backend in development mode
npm run dev

# Start individual services
npm run dev:backend    # Backend only (port 5000)
npm run dev:frontend   # Frontend only (port 3000)
```

### Testing
```bash
# Run all tests (backend and frontend)
npm test

# Run backend tests only
cd backend && npm test

# Run frontend tests only  
cd frontend && npm test

# Validate application structure
./test-app-structure.sh
```

### Docker Development
```bash
# Production deployment
docker-compose up -d

# Development with hot reload
docker-compose --profile dev up -d
```

### Build and Deployment
```bash
# Build frontend for production
npm run build

# Start production server (serves built frontend + API)
npm start
```

## Database Management

### Required Environment Variables

Backend requires `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hd-poker-runs
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

### MongoDB Setup
```bash
# macOS with Homebrew
brew services start mongodb-community

# Docker alternative
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

### Key Indexes
The application relies on specific MongoDB indexes defined in models:
- User: email (unique), role, address.state
- Event: date + status (compound), geospatial on coordinates, organizer

## Frontend Architecture Details

### Routing Strategy
Uses React Router v6 with the following key patterns:
- Nested routes for event registration (`/events/:id/register`)
- Protected routes handled via AuthContext
- Role-based route access for admin/organizer functions

### State Management Pattern
- **AuthContext**: Global authentication state with user profile and permissions
- **React Query**: Server state management for API calls and caching
- **Component State**: Local form and UI state only

### API Integration
- Axios-based service layer in `src/services/`
- Proxy configuration in frontend package.json points to backend
- Toast notifications for user feedback via react-toastify

## Backend API Structure

### Route Organization
- `/api/auth/*` - Authentication and user management
- `/api/events/*` - Event CRUD operations with role-based access
- `/api/participants/*` - Event registration and participant management

### Key Middleware
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for specific frontend URL
- **Authentication**: JWT verification middleware for protected routes
- **Security**: Helmet for security headers, express-validator for input validation

### Error Handling
Centralized error handling middleware with different responses for development vs production environments.

## Development Notes

### Role-Based Access
The application has three user roles with specific permissions:
- **participant**: Can view events and register for them
- **organizer**: Can create and manage their own events
- **admin**: Full access to all events and user management

### Geospatial Features
Events support location-based functionality using MongoDB's geospatial queries. Coordinates are stored as lat/lng pairs with 2dsphere indexing.

### File Upload Considerations
Multer is configured for handling file uploads (user avatars, event images). Ensure proper file validation and storage configuration in production.

### Email Integration
Nodemailer is set up for email notifications but requires SMTP configuration in production environment variables.

## Testing Strategy

The application includes Jest for backend testing and React Testing Library for frontend. The `test-app-structure.sh` script validates file structure and API route configuration.

## Security Implementation

- Password hashing with bcryptjs
- JWT tokens with configurable expiration
- Input validation using express-validator
- Rate limiting to prevent abuse
- CORS protection for cross-origin requests
- Helmet for security headers