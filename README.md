
# 📝 Task Manager App

A full-stack web application to manage tasks, built with **Angular** (frontend), **Spring Boot** (backend), and **MySQL** database.

---

## 🔧 Project Structure

```
/backend       --> Spring Boot App (Java)
/frontend      --> Angular App (TypeScript)
/docker-compose.yml
```

---

## 🚀 How to Run the Project

### 📌 1. Run Backend (Spring Boot)

#### 🧱 Requirements:
- Java 17+
- Maven

#### Clone the Project:

```bash
git clone https://github.com/dinildamsith/To-Do-list
```

#### 📦 Build & Run:

To run the backend:

```bash
cd backend
./mvnw spring-boot:run
```

Or build the JAR and run:

```bash
./mvnw clean package
java -jar target/back-end-0.0.1-SNAPSHOT.jar
```

> Backend runs by default at `http://localhost:8080/to-do-list/api/v1/test`

---

### 📌 2. Run Frontend (Angular)

#### 🧱 Requirements:
- Node.js (v16+)
- Angular CLI

#### ▶️ Serve App:

```bash
cd frontend
npm install
ng serve
```

> Frontend runs by default at `http://localhost:4200`

---

## 🛢️ Database Setup

Uses **MySQL** database. The backend will auto-create the DB on first run.

### 📦 MySQL Configuration (in `application.properties`):

```properties
spring.datasource.url=db_url
spring.datasource.username=your_password
spring.datasource.password=your_password
```

> Ensure MySQL is running locally with username `root` and password `1234`. You can adjust it as needed.

---

## 🔐 JWT Authentication 

If JWT is implemented:

### 👤 Demo Credentials

| Username | Password |
|----------|----------|
| admin    | admin123 |

### 🧾 API Auth Flow

- `POST /auth/sign-up` – Register a new user
- `POST /auth/sign-in` – Login, returns JWT token
- All protected APIs require header:  
  `Authorization: Bearer <your-token>`

### 🔒 Frontend Auth Flow

- Login form
- JWT stored in localStorage
- Auth token auto-attached in requests
- Protected routes only visible to logged-in users

---

## 🐳 Docker Setup 

You can run the entire app with Docker using `docker-compose`.

### 🧾 Build & Run:

```bash
docker-compose down -v  # stop and remove previous containers
docker-compose up --build
```

### Docker Setup Includes:

- MySQL container
- Spring Boot backend container
- Angular frontend container

> Make sure to include `Dockerfile` for both `/backend` and `/frontend`.

---

## 📸 Screenshots 



---

## 📂 Useful Scripts

```bash
# Backend
cd backend
./mvnw spring-boot:run

# Frontend
cd frontend
ng serve

# Docker
docker-compose up --build
```

---

## 📌 Author

Made with 💻 by Dinil Damsith  
Full Stack Developer

---

## 📄 License

MIT License
