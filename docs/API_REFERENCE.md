# REST API Reference — hazman5540

> [!NOTE]  
> **Last Updated:** 2026-07-25T05:08:40+08:00  
> **Codebase State:** Reflects Hono v4 routes implemented in `backend/src/routes/`.

---

## 1. Authentication Module (`/api/auth`)

### `POST /api/auth/login`
Authenticates administrative users and returns a JWT token.

- **Auth Required:** None (Public)
- **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "yourpassword"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "adm_123",
      "username": "admin",
      "name": "Hazman Admin",
      "role": "admin"
    }
  }
  ```
- **Failure Responses:**
  - `400 Bad Request`: `{"error": "Username and password are required"}`
  - `401 Unauthorized`: `{"error": "Invalid username or password"}`

---

### `POST /api/auth/student-login`
Authenticates student/intern accounts.

- **Auth Required:** None (Public)
- **Request Body:**
  ```json
  {
    "username": "student1",
    "password": "studentpassword"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "student": {
      "id": "std_456",
      "username": "student1",
      "name": "Ahmad Student",
      "role": "student"
    }
  }
  ```

---

## 2. Portfolio Module (`/api/portfolio`)

### `POST /api/portfolio/visitor`
Increments and returns the portfolio visitor count stored in Cloudflare D1.

- **Auth Required:** None (Public)
- **Request Body:** `{}` (Empty JSON object)
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 1420
  }
  ```
- **Failure Response (`500 Internal Server Error`):**
  ```json
  {
    "error": "Failed to update visitor count",
    "message": "D1 Execution Error"
  }
  ```

---

## 3. Organization Chart Module (`/api/orgchart`)

### `GET /api/orgchart/:id`
Retrieves a specific organization chart D1 record by ID.

- **Auth Required:** None (Public)
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "chart": {
      "id": "org_789",
      "title": "Engineering Team Structure",
      "chart_data": "[{\"id\":\"1\",\"name\":\"Hazman Adanan\",\"title\":\"Software Engineer\"}]",
      "created_at": "2026-07-24T18:30:00Z"
    }
  }
  ```
- **Failure Response (`404 Not Found`):**
  ```json
  {
    "error": "Org chart not found"
  }
  ```

### `POST /api/orgchart`
Creates a new organization chart record in D1.

- **Auth Required:** None / Admin Token
- **Request Body:**
  ```json
  {
    "title": "New Team Hierarchy",
    "chartData": [
      { "id": "1", "name": "Alice", "title": "Lead" }
    ]
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "id": "org_789",
    "message": "Org chart created successfully"
  }
  ```

---

## 4. Attendance Module (`/api/attendance`)

### `POST /api/attendance/clock-in`
Records a student's daily clock-in entry.

- **Auth Required:** Student Bearer Token
- **Request Body:**
  ```json
  {
    "studentId": "std_456",
    "studentName": "Ahmad Student",
    "photoUrl": "https://storage.bijokdev.com/uploads/photo.jpg",
    "location": "3.0738° N, 101.5183° E"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Clock-in recorded successfully",
    "log": {
      "id": "att_101",
      "date": "2026-07-25",
      "clock_in_time": "08:30:15"
    }
  }
  ```

---

## 5. System Health Module (`/api/system`)

### `GET /`
Global system health check endpoint.

- **Auth Required:** None
- **Success Response (`200 OK`):**
  ```json
  {
    "service": "hazman5540 API",
    "version": "2.0.0",
    "database": "hazman5540db (Cloudflare D1)",
    "status": "ok",
    "timestamp": "2026-07-25T05:08:40.000Z"
  }
  ```
