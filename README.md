# Murata Business Enterprises - React Assignment

A responsive React.js application featuring login functionality, employee management, and dashboard with sidebar navigation.

## Features

### 1. Login Page
- Name validation (minimum 3 characters, alphabets and spaces only)
- Mobile number validation (exactly 10 digits)
- Automatic timestamp display
- Form validation with error messages

### 2. Dashboard Layout
- Header with company logo and user info
- Responsive sidebar navigation
- Main content area
- Mobile-responsive design

### 3. Home Section
- Welcome message with user's name
- Background media (image/video) support
- Media upload functionality
- Overlay text on background

### 4. Employee Management
- Add new employees
- Inline editing of employee records
- Delete with confirmation popup
- Copy records with confirmation
- Auto-updating distance every 2 minutes
- Conditional styling (salary > ₹50,000 in red, distance > 2km blinking)
- Transparent table background when media is uploaded

### 5. Custom Formatters
- Salary: Converts to Indian currency format (₹50,000)
- Distance: Converts meters to km when > 1000m (2.2 km)
- Date: Formats timestamps (29 May 2026, 04:00 PM)

## Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd murata-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Login**: Enter name (min 3 chars) and 10-digit mobile number
2. **Home**: View welcome message, upload background media
3. **Employees**: Add, edit, delete, and copy employee records
4. **Auto Features**: Distance updates every 2 minutes automatically

## Validations

### Login Form
- Name: Required, minimum 3 characters, alphabets and spaces only
- Mobile: Required, exactly 10 digits

### Employee Form
- Name: Required, minimum 3 characters, alphabets and spaces only
- Salary: Required, positive number
- Gender: Required (Male/Female/Other)

## Responsive Design
- Desktop: Full sidebar layout
- Mobile: Collapsible sidebar, optimized spacing

## Technologies Used
- React.js
- React Router DOM
- CSS3 (Flexbox, Grid)
- Local Storage for user persistence
- JavaScript ES6+

## Project Structure
```
src/
├── components/
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Header.js
│   ├── Sidebar.js
│   ├── Home.js
│   ├── Employees.js
│   └── ConfirmModal.js
├── utils/
│   └── formatters.js
├── App.js
├── App.css
└── index.js
```