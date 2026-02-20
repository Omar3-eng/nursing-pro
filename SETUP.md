# Nursing Pro - Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Flutter 3.0+
- Git

## Backend Setup

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/Omar3-eng/nursing-pro.git
   cd nursing-pro/backend
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Configure environment
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database credentials
   \`\`\`

4. Initialize database
   \`\`\`bash
   psql -U postgres -f database/schema.sql
   \`\`\`

5. Start server
   \`\`\`bash
   npm run dev
   \`\`\`

## Frontend Setup

1. Navigate to frontend
   \`\`\`bash
   cd ../frontend
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Start development server
   \`\`\`bash
   npm start
   \`\`\`

4. Start Electron
   \`\`\`bash
   npm run electron
   \`\`\`

## Mobile Setup

1. Navigate to mobile
   \`\`\`bash
   cd ../mobile
   \`\`\`

2. Get dependencies
   \`\`\`bash
   flutter pub get
   \`\`\`

3. Run on Android
   \`\`\`bash
   flutter run
   \`\`\`

## Features

✅ Patient Management
✅ Appointment Scheduling
✅ Medication Tracking
✅ Staff Scheduling
✅ Reports Generation
✅ Real-time Alerts

## Technology Stack

- **Backend**: Node.js, Express, PostgreSQL
- **Desktop**: Electron, React, TailwindCSS
- **Mobile**: Flutter, Dart
- **Colors**: Professional Medical (Blue #0066CC, Green #00AA44, White)