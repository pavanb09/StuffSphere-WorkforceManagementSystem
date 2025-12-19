# StuffSphere-WorkforceManagementSystem

StaffSphere is a backend workforce management system built using **Java and Spring Boot**, designed to handle employee operations, HR administration, attendance tracking, and secure authentication in a real-world enterprise manner.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-Based Access Control (RBAC)
  - HR
  - Employee
- Secure password encryption
- Email-based OTP for:
  - Forgot Password
  - Reset Password

---

### 👨‍💼 HR Features
- Add and manage employees
- View employee attendance
- View attendance summaries
- Monitor workforce activity

---

### 👨‍💻 Employee Features
- Secure login using JWT
- Session-based attendance tracking
  - Multiple check-in and check-out per day
- View own attendance history
- Apply and manage leaves
- Password reset via OTP

---

### 🕒 Attendance Management (Real-World Design)
- Attendance is modeled using:
  - **AttendanceDay** (one per employee per day)
  - **AttendanceSession** (multiple sessions per day)
- Prevents overlapping sessions
- Accurate total working hours calculation
- HR attendance is auto-generated on login

---

## 🧠 System Design Highlights
- Clean layered architecture:
  - Controller
  - Service
  - Repository
- DTO-based API responses
- Centralized exception handling
- Secure method-level authorization
- Scalable and maintainable design

---

## 🛠 Tech Stack

| Technology | Usage |
|----------|------|
| Java | Backend language |
| Spring Boot | Application framework |
| Spring Security | Authentication & Authorization |
| JWT | Stateless security |
| Hibernate / JPA | ORM |
| MySQL | Database |
| Maven | Build tool |

---

## 🔗 API Overview

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Attendance
- `POST /api/attendance/check-in` *(Employee only)*
- `POST /api/attendance/check-out` *(Employee only)*
- `GET /api/attendance/me` *(Employee & HR)*

### Employee Management
- HR-only secured APIs for employee CRUD operations

---

## 🔐 Role-Based Access Rules

| Action | Employee | HR |
|------|---------|----|
| Login | ✅ | ✅ |
| Check-in / Check-out | ✅ | ❌ |
| View own attendance | ✅ | ✅ |
| View all attendance | ❌ | ✅ |
| Add employee | ❌ | ✅ |

---

## 📦 Project Structure
src/main/java/com/coders/staffsphereworkforce
│
├── controller
├── service
│ └── impl
├── repository
├── model
├── dto
├── security
├── exception
└── util

---

## 🧪 Testing
- APIs tested using Postman
- JWT-protected endpoints verified
- Attendance edge cases handled:
  - Multiple check-ins
  - No overlapping sessions
  - Auto HR attendance

---

## 🎯 Future Enhancements
- Frontend integration (React)
- Export attendance reports (PDF/Excel)

---

## 👨‍💻 Author
**Pavan Kumar**  
Aspiring Backend / Full Stack Developer  

---

## 📌 Note
This project is built with **real-world enterprise practices**, focusing on clean design, security, and scalability rather than simple CRUD operations.
