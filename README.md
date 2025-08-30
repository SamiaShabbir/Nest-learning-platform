# Nest Learning Platform


A feature‑rich Learning Management System (LMS) built with **Nest.js**. It provides educators and learners with tools for interactive courses, enrollment, progress tracking, user roles, and content management.

[🔗 Frontend Repository: Learning Platform Frontend (Next.js)](https://github.com/Sadie2260/Learning-Platfrom)


[![NestJS](https://img.shields.io/badge/NestJS-Framework-E0234E?logo=nestjs&logoColor=white)](#)
[![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#)

---


## Table of Contents
- [Nest Learning Platform](#nest-learning-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [1) Clone \& Install](#1-clone--install)
---


## Features
- **User Authentication & Authorization**: roles for *students*, *instructors*, and *admins*; JWT‑based auth.
- **Course Management**: create, edit, and delete courses; support for multimedia content.
- **Enrollment**: students enroll in courses and track their progress.
- **Progress Tracking**: per‑lesson completion, course progress, and simple reports.
- **Admin Dashboard**: manage users, courses, and platform settings.
- **(Optional) Blog/Announcements**: share updates and learning resources.


---


## Tech Stack
- **Backend**: Nest.js, TypeScript
- **Auth**: JWT (access/refresh optional)
- **Database**: configurable via `DATABASE_URL` (e.g., Postgres/MySQL/SQLite)
- **Docs**: Swagger (Nest Swagger module)
- **Testing**: Jest (unit/e2e)


---


## Installation
### 1) Clone & Install
```bash
git clone https://github.com/SamiaShabbir/Nest-learning-platform
cd nest-learning-platform
npm install


2) Environment Variables
Create a .env file in the project root:
PORT=3000
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"


3) Run
Dev
npm run start:dev
Prod
npm run build
npm run start:prod
App runs on: http://localhost:${PORT} (default http://localhost:3000)


Usage

Students: sign up, enroll, and access course materials.

Instructors: create/manage courses, lessons, quizzes, and assignments.

Admins: manage users, courses, and platform settings.


API Documentation

Swagger is exposed at (configurable): http://localhost:${PORT}/docs
Use Postman or any REST client to test endpoints (auth, users, courses, enrollment, progress).


Project Structure
nest-learning-platform/
├─ src/
│ ├─ auth/ # authentication & authorization (JWT, guards)
│ ├─ users/ # user profiles & roles
│ ├─ courses/ # course entities, lessons, media
│ ├─ enrollment/ # enrollment flows
│ ├─ progress/ # tracking & reports
│ ├─ common/ # interceptors, pipes, guards, utils
│ ├─ app.module.ts
│ └─ main.ts # bootstrap & Swagger setup
├─ test/ # unit/e2e tests
├─ .env # environment (local)
├─ package.json
└─ README.md

Contributing
We welcome contributions!

1.Fork the repo and create your branch:
git checkout -b feat/awesome-feature

2.Commit using clear messages:
git commit -m "feat(auth): add refresh token support"

3.Push and open a Pull Request.
Please see CONTRIBUTING.md for guidelines.

👤 Author

Samia Shabbir (Synterion Solutions)
Portfolio: https://synterion-solutions.vercel.app/
Email: <info.synterionsolutions@gmail.com>