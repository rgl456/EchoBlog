# EchoBlog

A full-stack blogging platform built with Spring Boot and React, featuring JWT authentication, post management, categories, and tags.

## Features

- 🔐 **JWT Authentication** - Secure login/registration with token-based auth stored in cookies
- 📝 **Post Management** - Create, update, delete, and publish blog posts
- 📂 **Categories & Tags** - Organize posts with custom categories and tags
- 💾 **Draft System** - Save posts as drafts before publishing
- 🔍 **Filtering** - Filter posts by category or tag
- 🛡️ **Protected Routes** - Client-side route protection for authenticated users
- ⚠️ **Custom Exception Handling** - Consistent error responses with custom REST controller advice

## Tech Stack

### Backend
- **Spring Boot** - REST API framework
- **Spring Security** - Authentication and authorization
- **JWT** - Token-based authentication
- **MySQL/PostgreSQL** - Database (assumed)
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client (assumed)
- **CSS** - Styling

## API Endpoints

### Authentication
```
POST /api/v1/login       - User login
POST /api/v1/register    - User registration
```

### Posts
```
GET    /api/v1/posts              - Get all posts (with optional filters)
GET    /api/v1/posts/published    - Get published posts
GET    /api/v1/posts/drafts       - Get user's draft posts
GET    /api/v1/posts/{categoryId} - Get posts by category
POST   /api/v1/posts              - Create new post
PUT    /api/v1/posts/{id}         - Update post
DELETE /api/v1/posts/{id}         - Delete post
```

### Categories
```
GET    /api/v1/categories     - Get all categories
POST   /api/v1/categories     - Create category
DELETE /api/v1/categories/{id} - Delete category
```

### Tags
```
GET    /api/v1/tags     - Get all tags
POST   /api/v1/tags     - Create tags
DELETE /api/v1/tags/{id} - Delete tag
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL/PostgreSQL
- Maven

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/echoblog.git
cd echoblog
```

2. Configure database in `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/echoblog
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the application
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
echoblog/
├── src/main/java/
│   ├── controllers/
│   │   ├── AuthController.java
│   │   ├── PostController.java
│   │   ├── CategoryController.java
│   │   └── TagController.java
│   ├── services/
│   ├── repositories/
│   ├── models/
│   └── security/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── CreatePost.jsx
    │   │   ├── UpdatePost.jsx
    │   │   ├── DraftPosts.jsx
    │   │   ├── CreateCategory.jsx
    │   │   ├── CreateTag.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── css/
    │   └── App.jsx
    └── package.json
```

## Key Features Details

### Authentication Flow
- Users register with credentials
- JWT token generated on successful login
- Token stored in HTTP-only cookie
- Token validated on protected endpoints
- User ID extracted from token for user-specific operations

### Post Management
- Create posts with title, content, category, and tags
- Save as draft or publish immediately
- Update existing posts
- Delete posts
- Filter posts by category or tag

### Authorization
- Protected routes require valid JWT token
- User-specific endpoints (drafts) use userId from token
- Frontend ProtectedRoute component guards authenticated pages

## API Documentation

Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

## Security

- Passwords hashed using BCrypt
- JWT tokens with configurable expiration
- HTTP-only cookies prevent XSS attacks
- CORS configured for frontend origin
- Custom exception handling for consistent error responses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/echoblog](https://github.com/yourusername/echoblog)

---

Made with ❤️ using Spring Boot and React
