# 📄 Flowzen Study Planner — Software Documentation

> **Project:** Flowzen Study Planner  
> **Author:** Aditi Darekar, Arya Jadhav.
> **Version:** 1.0.0  ### 2.4 API Reference
The backend exposes a set of RESTful endpoints to facilitate communication between the Vanilla JS frontend and the Spring Boot service.

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/subjects` | Retrieve all academic subjects and metadata. | ✅ Active |
| `POST` | `/api/subjects` | Create a new study category with color-coding. | ✅ Active |
| `GET` | `/api/tasks` | Fetch all pending and completed tasks. | ✅ Active |
| `POST` | `/api/tasks` | Add a new task linked to a specific subject. | ✅ Active |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle task completion status (Boolean). | ✅ Active |
| `DELETE` | `/api/tasks/{id}` | Permanently remove a task record. | ✅ Active |
| `GET` | `/api/stats/summary` | Retrieve dashboard stats (streaks, total hours). | ✅ Active |

---

## 3. Development & Implementation

### 3.1 Features Explained
* **Hybrid Storage Engine:** A custom wrapper around the `Fetch API` that monitors network status. If the backend is down, it seamlessly redirects traffic to `window.localStorage`, ensuring zero downtime.
* **Pomodoro Focus Timer:** Implemented using a high-precision `setInterval` loop with an animated SVG progress ring that updates dynamically as the countdown progresses.
* **Progress Analytics:** A logic-driven module that calculates completion percentages per subject by comparing completed tasks against the total task count in the global state.

### 3.2 Project Folder Structure
The project follows a clean separation of concerns between the Presentation and Business Logic layers.

```text
flowzen-study-planner/
├── frontend/                # Client-Side Application
│   ├── index.html           # Main Application Shell (SPA)
│   ├── css/
│   │   └── style.css        # Custom Theming & Responsive Layouts
│   └── js/
│       ├── api.js           # API Bridge & Offline Fallback Logic
│       └── app.js           # State Management & DOM Rendering
└── backend/                 # Server-Side Application
    ├── pom.xml              # Maven Dependencies & Configuration
    └── src/main/java/com/flowzen/
        ├── controller/      # REST API Endpoints
        ├── service/         # Business Logic Facade
        ├── repository/      # Spring Data JPA Interfaces
        └── model/           # Database Entities (Subject, Task, Session)### 2.4 API Reference
The backend exposes a set of RESTful endpoints to facilitate communication between the Vanilla JS frontend and the Spring Boot service.

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/subjects` | Retrieve all academic subjects and metadata. | ✅ Active |
| `POST` | `/api/subjects` | Create a new study category with color-coding. | ✅ Active |
| `GET` | `/api/tasks` | Fetch all pending and completed tasks. | ✅ Active |
| `POST` | `/api/tasks` | Add a new task linked to a specific subject. | ✅ Active |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle task completion status (Boolean). | ✅ Active |
| `DELETE` | `/api/tasks/{id}` | Permanently remove a task record. | ✅ Active |
| `GET` | `/api/stats/summary` | Retrieve dashboard stats (streaks, total hours). | ✅ Active |

---

## 3. Development & Implementation

### 3.1 Features Explained
* **Hybrid Storage Engine:** A custom wrapper around the `Fetch API` that monitors network status. If the backend is down, it seamlessly redirects traffic to `window.localStorage`, ensuring zero downtime.
* **Pomodoro Focus Timer:** Implemented using a high-precision `setInterval` loop with an animated SVG progress ring that updates dynamically as the countdown progresses.
* **Progress Analytics:** A logic-driven module that calculates completion percentages per subject by comparing completed tasks against the total task count in the global state.

### 3.2 Project Folder Structure
The project follows a clean separation of concerns between the Presentation and Business Logic layers.

```text
flowzen-study-planner/
├── frontend/                # Client-Side Application
│   ├── index.html           # Main Application Shell (SPA)
│   ├── css/
│   │   └── style.css        # Custom Theming & Responsive Layouts
│   └── js/
│       ├── api.js           # API Bridge & Offline Fallback Logic
│       └── app.js           # State Management & DOM Rendering
└── backend/                 # Server-Side Application
    ├── pom.xml              # Maven Dependencies & Configuration
    └── src/main/java/com/flowzen/
        ├── controller/      # REST API Endpoints
        ├── service/         # Business Logic Facade
        ├── repository/      # Spring Data JPA Interfaces
        └── model/           # Database Entities (Subject, Task, Session)
> **Date:** March 2026  
> **Document Type:** Requirement Analysis, System Design & Development Documentation

---

## Table of Contents

1. [Requirement Analysis & Planning](#1-requirement-analysis--planning)
   - [1.1 Project Overview](#11-project-overview)
   - [1.2 Functional Requirements](#12-functional-requirements)
   - [1.3 Non-Functional Requirements](#13-non-functional-requirements)
   - [1.4 Technology Stack](#14-technology-stack)
   - [1.5 Tools & Platform](#15-tools--platform)
2. [System Design](#2-system-design)
   - [2.1 System Architecture](#21-system-architecture)
   - [2.2 Database Schema (ER Diagram)](#22-database-schema-er-diagram)
   - [2.3 User Flow Diagram](#23-user-flow-diagram)
   - [2.4 API Reference](#24-api-reference)
3. [Development & Implementation](#3-development--implementation)
   - [3.1 Features Explained](#31-features-explained)
   - [3.2 Project Folder Structure](#32-project-folder-structure)
   - [3.3 UI Design System (CSS)](#33-ui-design-system-css)

---

## 1. Requirement Analysis & Planning

### 1.1 Project Overview
**Flowzen Study Planner** is a full-stack web application designed to help students plan, organize, and track their academic studies. It bridges the gap between simple task lists and complex management tools by providing a student-centric workspace with built-in productivity tools like Pomodoro timers.

### 1.2 Functional Requirements
* **Dashboard:** Visual summary of tasks, streaks, and subject completion.
* **Subject Management:** Categorization of studies with customizable color coding.
* **Task Management:** CRUD operations for tasks with priority levels (Low, Medium, High).
* **Weekly Scheduler:** Time-blocked study session planning for a 7-day period.
* **Productivity Timer:** Integrated Pomodoro timer with pre-set intervals for deep work and breaks.
* **Hybrid Storage:** Local-first data handling with background synchronization to the Spring Boot API.

### 1.3 Non-Functional Requirements
* **Availability:** Seamless transition between offline (localStorage) and online (REST API) modes.
* **Performance:** Single Page Application (SPA) architecture for instantaneous view switching.
* **Usability:** Modern "Dark Mode" interface with intuitive navigation.

### 1.4 Technology Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Backend:** Java 17, Spring Boot 3.5.
* **Database:** MySQL 8 (Persistent) / H2 (In-memory).
* **Build Tool:** Maven 3.8.

### 1.5 Tools & Platform
* **Development:** VS Code (Visual Studio Code).
* **Version Control:** Git & GitHub.
* **Testing:** Postman / Browser DevTools.

---

## 2. System Design

### 2.1 System Architecture
The application utilizes a **Decoupled 3-Tier Architecture**:
1. **Presentation Layer:** A responsive Vanilla JS SPA that handles UI state and DOM manipulation.
2. **Business Logic Layer:** A stateless Spring Boot REST API following the Controller-Service-Repository pattern.
3. **Data Layer:** Relational storage managed via Spring Data JPA/Hibernate.

### 2.2 Database Schema (ER Diagram)
The relational model ensures that study data is organized logically around specific Subjects.

```text
       ┌──────────────────────────┐          ┌──────────────────────────┐
       │         SUBJECT          │          │           TASK           │
       ├──────────────────────────┤          ├──────────────────────────┤
       │ id (PK)         BIGINT   │◄──┐      │ id (PK)         BIGINT   │
       │ name            VARCHAR  │   │      │ title           VARCHAR  │
       │ description     VARCHAR  │   └─────╼│ subject_id (FK) BIGINT   │
       │ color           VARCHAR  │          │ priority        ENUM     │
       │ created_at      DATETIME │          │ completed       BOOLEAN  │
       └─────────────┬────────────┘          └──────────────────────────┘
                     │
                     │                       ┌──────────────────────────┐
                     │                       │      STUDY_SESSION       │
                     │                       ├──────────────────────────┤
                     │                       │ id (PK)         BIGINT   │
                     └──────────────────────╼│ subject_id (FK) BIGINT   │
                                             │ date            DATE     │
                                             │ start_time      TIME     │
                                             │ end_time        TIME     │
                                             └──────────────────────────┘

### 2.3 User Flow Diagram
The application follows a state-driven logic flow to ensure data consistency between the client and the server.

```text
[User Accesses App]
        │
        ▼
[Authentication/Check Session]
        │
        ▼
[Initial Data Load] ─── Offline ──▶ [Fetch from localStorage] ──┐
        │                                                       │
      Online                                                    │
        │                                                       │
        ▼                                                       ▼
[Fetch from Spring Boot API] ── Sync ──▶ [Global App State Object]
                                                   │
                                                   ▼
                                         [Render Dashboard UI]
                                                   │
             ┌────────────────┬────────────────────┴───────────────┐
             ▼                ▼                                    ▼
    [Manage Subjects]   [Track Tasks]                      [Start Focus Timer]
             │                │                                    │
             └───────┬────────┴────────────────────────────────────┘
                     ▼
            [Update State Object]
                     │
             ┌───────┴───────┐
             ▼               ▼
    [Sync to Backend]  [Update Local Storage]

### 2.4 API Reference
The backend exposes a set of RESTful endpoints to facilitate communication between the Vanilla JS frontend and the Spring Boot service.

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/subjects` | Retrieve all academic subjects and metadata. | ✅ Active |
| `POST` | `/api/subjects` | Create a new study category with color-coding. | ✅ Active |
| `GET` | `/api/tasks` | Fetch all pending and completed tasks. | ✅ Active |
| `POST` | `/api/tasks` | Add a new task linked to a specific subject. | ✅ Active |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle task completion status (Boolean). | ✅ Active |
| `DELETE` | `/api/tasks/{id}` | Permanently remove a task record. | ✅ Active |
| `GET` | `/api/stats/summary` | Retrieve dashboard stats (streaks, total hours). | ✅ Active |

---

## 3. Development & Implementation

### 3.1 Features Explained
* **Hybrid Storage Engine:** A custom wrapper around the `Fetch API` that monitors network status. If the backend is down, it seamlessly redirects traffic to `window.localStorage`, ensuring zero downtime.
* **Pomodoro Focus Timer:** Implemented using a high-precision `setInterval` loop with an animated SVG progress ring that updates dynamically as the countdown progresses.
* **Progress Analytics:** A logic-driven module that calculates completion percentages per subject by comparing completed tasks against the total task count in the global state.

### 3.2 Project Folder Structure
The project follows a clean separation of concerns between the Presentation and Business Logic layers.

```text
flowzen-study-planner/
├── frontend/                # Client-Side Application
│   ├── index.html           # Main Application Shell (SPA)
│   ├── css/
│   │   └── style.css        # Custom Theming & Responsive Layouts
│   └── js/
│       ├── api.js           # API Bridge & Offline Fallback Logic
│       └── app.js           # State Management & DOM Rendering
└── backend/                 # Server-Side Application
    ├── pom.xml              # Maven Dependencies & Configuration
    └── src/main/java/com/flowzen/
        ├── controller/      # REST API Endpoints
        ├── service/         # Business Logic Facade
        ├── repository/      # Spring Data JPA Interfaces
        └── model/           # Database Entities (Subject, Task, Session)

### 2.4 API Reference
The backend exposes a set of RESTful endpoints to facilitate communication between the Vanilla JS frontend and the Spring Boot service.

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/subjects` | Retrieve all academic subjects and metadata. | ✅ Active |
| `POST` | `/api/subjects` | Create a new study category with color-coding. | ✅ Active |
| `GET` | `/api/tasks` | Fetch all pending and completed tasks. | ✅ Active |
| `POST` | `/api/tasks` | Add a new task linked to a specific subject. | ✅ Active |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle task completion status (Boolean). | ✅ Active |
| `DELETE` | `/api/tasks/{id}` | Permanently remove a task record. | ✅ Active |
| `GET` | `/api/stats/summary` | Retrieve dashboard stats (streaks, total hours). | ✅ Active |

---

## 3. Development & Implementation

### 3.1 Features Explained
* **Hybrid Storage Engine:** A custom wrapper around the `Fetch API` that monitors network status. If the backend is down, it seamlessly redirects traffic to `window.localStorage`, ensuring zero downtime.
* **Pomodoro Focus Timer:** Implemented using a high-precision `setInterval` loop with an animated SVG progress ring that updates dynamically as the countdown progresses.
* **Progress Analytics:** A logic-driven module that calculates completion percentages per subject by comparing completed tasks against the total task count in the global state.

### 3.2 Project Folder Structure
The project follows a clean separation of concerns between the Presentation and Business Logic layers.

```text
flowzen-study-planner/
├── frontend/                # Client-Side Application
│   ├── index.html           # Main Application Shell (SPA)
│   ├── css/
│   │   └── style.css        # Custom Theming & Responsive Layouts
│   └── js/
│       ├── api.js           # API Bridge & Offline Fallback Logic
│       └── app.js           # State Management & DOM Rendering
└── backend/                 # Server-Side Application
    ├── pom.xml              # Maven Dependencies & Configuration
    └── src/main/java/com/flowzen/
        ├── controller/      # REST API Endpoints
        ├── service/         # Business Logic Facade
        ├── repository/      # Spring Data JPA Interfaces
        └── model/           # Database Entities (Subject, Task, Session)