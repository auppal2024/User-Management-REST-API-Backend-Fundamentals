# User Management REST API – Backend Fundamentals

A step-by-step evolving Node.js backend project demonstrating fundamental backend architecture concepts, built with Express.js and JWT authentication. This project serves as a learning foundation for understanding REST APIs, authentication, and database integration.

## Project Overview

This is a Node.js REST API focused on user management with authentication and role-based access control. The project evolves incrementally to explore backend development patterns, starting with basic CRUD operations and progressing to secure authentication systems. It uses in-memory storage for demonstration purposes, with a clear path toward database integration.

**Current Status**: Active development project demonstrating backend fundamentals. Not production-ready.

**Tech Stack**:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Storage**: In-memory arrays (demo purposes)
- **Security**: bcrypt for password hashing

## Purpose and Learning Intent

This project serves as a practical learning tool for backend development fundamentals:

- Understanding REST API design and implementation
- Implementing JWT-based authentication flows
- Exploring role-based authorization patterns
- Learning clean architecture principles
- Practicing secure coding practices (password hashing, token management)
- Gaining experience with middleware and error handling

The codebase is intentionally structured to be readable and modifiable, making it suitable for educational purposes and as a starting point for more complex applications.

## High-Level System Architecture

```
Client Request → Express Server → Middleware → Route Handler → Controller → Service → Model → Response
                                      ↓
                               Authentication Middleware
                                      ↓
                               Authorization Middleware
```

**Key Components**:
- **Routes**: Define API endpoints and map to controllers
- **Controllers**: Handle HTTP requests/responses, input validation
- **Services**: Business logic layer
- **Models**: Data structures and storage operations
- **Middleware**: Cross-cutting concerns (auth, error handling, logging)

## Folder Structure

```
├── controllers/          # Request handlers and response formatting
│   └── authController.js # Authentication logic (register, login, refresh, logout)
├── middleware/           # Express middleware functions
│   └── auth.js          # JWT verification and role-based access control
├── models/              # Data models and storage operations
│   └── User.js          # User model with password hashing and token management
├── routes/              # Route definitions and middleware application
│   ├── auth.js          # Authentication routes
│   └── protected.js     # Protected API routes
├── app.js               # Express application setup and configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

**Responsibilities**:
- `controllers/`: Pure functions handling HTTP I/O, delegating business logic
- `middleware/`: Reusable functions for authentication, validation, and error handling
- `models/`: Data persistence and business rules
- `routes/`: URL routing and middleware composition

## Data Model

### User Entity
```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  name: string,         // User's full name
  email: string,        // Unique email address (used for login)
  password: string,     // Hashed password (bcrypt)
  role: string          // 'user' or 'admin'
}
```

**Notes**:
- Passwords are hashed using bcrypt with salt rounds of 10
- Roles determine access permissions (user vs admin)
- Currently stored in memory; designed for easy migration to database

### Roles and Permissions
- **User**: Access to public routes and basic protected routes
- **Admin**: All user permissions plus admin-only routes (user management)

## Authentication and Authorization Flow

### Authentication Flow
1. User registers via POST /auth/signup with name, email, password, role
2. User logs in via POST /auth/login with email/password
3. Server validates credentials and returns access + refresh tokens
4. Client includes access token in Authorization header for protected requests
5. Server verifies JWT and grants access or returns 401

### Authorization Flow
1. Protected routes require valid JWT in Authorization header
2. Middleware verifies token signature and expiry
3. Role-based middleware checks user permissions
4. Access granted or 403 Forbidden returned

### Token Management
- **Access Token**: Short-lived (15 minutes), contains user identity
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens
- Tokens invalidated on logout via refresh token deletion

## Request Lifecycle

1. **Client Request**: HTTP request arrives at Express server
2. **Middleware Chain**:
   - JSON parsing middleware
   - Authentication middleware (verifies JWT if present)
   - Route-specific middleware (role checks)
3. **Route Matching**: Express matches URL to route handler
4. **Controller**: Validates input, calls service layer
5. **Service**: Executes business logic, interacts with models
6. **Model**: Handles data operations (currently in-memory)
7. **Response**: Formatted JSON response sent to client

**Error Handling**: Centralized error middleware catches exceptions and returns appropriate HTTP status codes.

## API Endpoints

### Authentication Endpoints (`/auth`)
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Authenticate user and get tokens
- `POST /auth/refresh` - Get new access token using refresh token
- `POST /auth/logout` - Invalidate refresh token

### Public Endpoints
- `GET /` - API health check and information
- `GET /public` - Example public route

### Protected Endpoints (`/` - requires authentication)
- `GET /users` - Get user information (authenticated users only)

### Admin-Only Endpoints (`/` - requires admin role)
- `GET /admin/users` - List users (admin only)
- `DELETE /admin/users/:email` - Delete user by email (admin only)

**Request/Response Examples**:

```bash
# Register
curl -X POST http://localhost:3995/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secure123","role":"user"}'

# Login
curl -X POST http://localhost:3995/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secure123"}'
# Response: {"accessToken":"...", "refreshToken":"...", "expiresIn":"15m"}

# Access protected route
curl -X GET http://localhost:3995/users \
  -H "Authorization: Bearer <accessToken>"
```

## Error Handling Strategy

**HTTP Status Codes**:
- `200` - Success
- `201` - Resource created
- `400` - Bad request (missing/invalid data)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `409` - Conflict (duplicate resource)
- `500` - Internal server error

**Error Response Format**:
```json
{
  "message": "Human-readable error description"
}
```

**Centralized Handling**: Express error middleware catches unhandled exceptions and returns 500 responses. Authentication errors are handled in middleware with appropriate status codes.

## Security Considerations

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- No plain-text storage
- Secure comparison using bcrypt's built-in methods

### JWT Implementation
- Tokens signed with secret key (stored in environment variables)
- Short access token expiry (15 minutes) reduces exposure
- Refresh tokens for seamless re-authentication
- Tokens invalidated on logout

### Role-Based Access Control
- Middleware enforces role requirements
- Admin routes protected with role checks
- Clear separation of public, user, and admin permissions

### General Security
- Input validation in controllers
- CORS configuration (to be added)
- Environment variable configuration for secrets
- No sensitive data logged

## How to Run the Project Locally

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
# Clone repository
git clone <repository-url>
cd user-management-api

# Install dependencies
npm install
```

### Environment Setup
Create `.env` file in root directory:
```env
PORT=3995
JWT_SECRET=your-secure-secret-key-here
```

### Running the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:3995`

### Testing the API
Use tools like Postman, curl, or Thunder Client to test endpoints. See API Endpoints section for examples.

## Testing Approach

**Current Testing**: Manual functional testing via API calls

**Test Scenarios**:
- Authentication flow (register → login → access protected routes)
- Authorization (role-based access control)
- Token management (refresh, expiry, logout)
- Error conditions (invalid tokens, missing permissions)
- Edge cases (duplicate users, malformed requests)

**Future Testing**: Unit tests with Jest, integration tests with Supertest

## Key Learnings So Far

- **Clean Architecture**: Separation of concerns improves maintainability
- **JWT Best Practices**: Short access tokens with refresh mechanism
- **Middleware Pattern**: Reusable cross-cutting concerns
- **Security First**: Password hashing and secure token handling
- **Error Handling**: Centralized approach prevents information leakage
- **API Design**: RESTful conventions and consistent response formats

## Future Improvements

- **Database Integration**: Replace in-memory storage with PostgreSQL
- **Input Validation**: Add comprehensive validation with Joi or similar
- **Rate Limiting**: Prevent abuse with express-rate-limit
- **Logging**: Structured logging with Winston
- **API Documentation**: OpenAPI/Swagger documentation
- **Testing**: Comprehensive test suite (unit, integration, e2e)
- **Docker**: Containerization for consistent deployment
- **CI/CD**: Automated testing and deployment pipeline
- **Monitoring**: Health checks and metrics collection

---

This project demonstrates fundamental backend concepts and serves as a solid foundation for more advanced features. Contributions and feedback welcome!