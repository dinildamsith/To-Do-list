Here is the `README.md` file formatted with the details you requested:

```markdown
# 🌐 Full Stack Application - Angular + Spring Boot + MySQL (or MongoDB) + Docker

This is a full-stack web application with Angular frontend, Spring Boot backend, and MySQL or MongoDB as the database. Everything runs in containers using Docker and Docker Compose.

---

## 🚀 How to Run Backend & Frontend

### 📌 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### 🧭 Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Build the Project**
   > Make sure you build the backend first if needed:
   ```bash
   cd backend
   mvn clean install    # or ./gradlew build
   ```

3. **Run Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   
   - [Frontend](http://localhost:4200)
   - [Backend](http://localhost:8080/api)

---

### 🗃️ Database Setup Details

#### Option 1: Using MySQL
- **Service Name:** `mysql-db`
- **Database Name:** `task_db`
- **Username:** `user`
- **Password:** `password`

Make sure to configure your Spring Boot `application.properties` or `application.yml` with the following properties:

```properties
spring.datasource.url=jdbc:mysql://mysql-db:3306/task_db
spring.datasource.username=user
spring.datasource.password=password
```

#### Option 2: Using MongoDB (Optional)
If you are using MongoDB instead of MySQL, make sure you have a MongoDB container running and update the Spring Boot `application.properties` or `application.yml` accordingly.

---

### 🔑 Accessing Secured Endpoints

If your API uses JWT authentication, you need to include the JWT token in the `Authorization` header when making API requests:

```http
Authorization: Bearer <your-jwt-token>
```

For testing, you can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

---

## 🛠️ Docker and Docker Compose Setup

### Docker Setup

- **Backend Dockerfile:**

Create a `Dockerfile` in the backend directory with the following content:

```dockerfile
# Use official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the jar file into the container
COPY target/your-app.jar /app/your-app.jar

# Expose the port on which your backend will run
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "your-app.jar"]
```

### Frontend Dockerfile

Create a `Dockerfile` in the frontend directory with the following content:

```dockerfile
# Use Node.js as a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx to serve the built frontend
FROM nginx:alpine
COPY --from=0 /app/dist/your-angular-app /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80
```

### Docker Compose Configuration

Here is the `docker-compose.yml` file to run the entire application:

```yaml
version: "3.8"

services:
  backend:
    build:
      context: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql-db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql-db:3306/task_db
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: password
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
    ports:
      - "4200:80"
    depends_on:
      - backend
    networks:
      - app-network

  mysql-db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: task_db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

---

## 📸 Screenshots (Optional)

![Screenshot1](./screenshots/screenshot1.png)

---

## 🔐 JWT Authentication (Optional)

If you're using JWT, ensure you have an authentication mechanism in place in the backend to issue tokens after user login. You can then use these tokens to authenticate and authorize requests on secured endpoints.

### Example Authentication Flow

1. **User logs in** with their credentials via a POST request to `/api/auth/login`.
2. **Server responds with a JWT token**.
3. **User sends the JWT token** in the `Authorization` header for subsequent requests to secured APIs.

---

## 💡 Conclusion

This project provides a full-stack web application running on Docker, with a Spring Boot backend, Angular frontend, and MySQL or MongoDB database. By using Docker Compose, you can easily set up and manage all services together.

---

Let me know if you need further assistance with any of the steps or configurations!
```

### Key Sections:
1. **How to Run the Project**: Instructions to clone, build, and run the application using Docker Compose.
2. **Database Setup**: MySQL configuration details, along with a fallback for MongoDB.
3. **Docker & Docker Compose**: Instructions to set up Dockerfiles for both frontend and backend and configure `docker-compose.yml`.
4. **JWT Authentication**: How JWT tokens are used for securing endpoints.

You can customize the placeholders like `your-username`, `your-repo-name`, and `your-angular-app` to match your actual setup.
