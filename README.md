# Lead Management CRM

Full-stack CRM with Node.js, React Admin Panel, and Expo Mobile App.

## Project Structure

- `backend/`: Node.js Express API with MongoDB & Baileys WhatsApp.
- `admin-panel/`: React + Vite Admin Dashboard.
- `mobile-app/`: Expo React Native App for Employees.

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
# Configure .env with your MONGO_URI
npm run dev (or node server.js)
```

### 2. Admin Panel

```bash
cd admin-panel
npm install
npm run dev
```
Access at `http://localhost:5173`.

### 3. Mobile App

```bash
cd mobile-app
npm install
npx expo start
```
Scan QR code with Expo Go.

## Features Implemented

- **Authentication**: JWT, bcrypt, Role-based (Admin/Employee).
- **Leads**: Create, List, Excel Upload, Assignment.
- **WhatsApp**: Baileys integration for messaging.
- **Admin UI**: Dashboard, Employee Approval, Lead Management.

## WhatsApp Setup

The backend will print a QR code in the terminal when you start it. Scan this with your WhatsApp to link the session.
