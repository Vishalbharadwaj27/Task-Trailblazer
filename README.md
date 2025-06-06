# Kanban - Task Management System

A full-featured Kanban-style task management application with MongoDB database integration.

## Features

- User authentication
- Task creation, editing, and deletion
- Drag-and-drop task management across To Do, In Progress, and Done columns
- Task assignments to team members
- Due date tracking with color-coded indicators
- Activity logging for all user actions
- Role-based access control (Admin, Manager, Member)

## Tech Stack

- **Frontend**: React + TypeScript with Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn/ui components

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- MongoDB (local or MongoDB Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-trailblazer-kanban
```

### 2. Install Dependencies

From the project root, run:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup

1. **Backend**:
   - Copy `.env.example` to `.env` in the `backend` directory
   - Update the MongoDB connection string and other environment variables as needed

2. **Frontend**:
   - A `.env` file is already created with default values
   - Update `VITE_API_URL` if your backend is running on a different port

### 4. Start the Application

#### Development Mode

From the project root, run:

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

#### Production Build

```bash
# Build the frontend
cd frontend
npm run build

# Start the backend (from project root)
cd ..
npm start
```

## Project Structure

```
task-trailblazer-kanban/
├── frontend/                 # React frontend
│   ├── public/               # Static files
│   ├── src/                  # Source code
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── styles/           # Global styles
│   │   ├── types/            # TypeScript type definitions
│   │   ├── App.tsx           # Main App component
│   │   └── main.tsx          # Application entry point
│   ├── .env                  # Frontend environment variables
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
│
├── backend/                 # Node.js backend
│   ├── server.js             # Express server
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend environment variables
│
├── .gitignore              # Git ignore file
├── package.json             # Root package.json for scripts
└── README.md                # Project documentation
```

## Available Scripts

From the project root:

- `npm run dev` - Start both frontend and backend in development mode
- `npm start` - Start the production server
- `npm run build` - Build the frontend for production

## Environment Variables

### Frontend (`.env` in frontend directory)

```
VITE_API_URL=http://localhost:5000/api
VITE_FRONTEND_URL=http://localhost:3000
```

### Backend (`.env` in backend directory)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kanban
FRONTEND_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Frontend Setup

1. In the root directory, install dependencies:
   ```
   npm install
   ```

2. Start the React development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Log in with any email/password (the application accepts any credentials)
2. Create, edit, and manage tasks using the Kanban board
3. Drag tasks between columns to change their status
4. Assign tasks to team members
5. Set due dates for tasks
6. View recent activities in the sidebar

## Troubleshooting

If you encounter "Failed to fetch" errors:
1. Ensure both frontend and backend servers are running
2. Check that MongoDB is running and accessible
3. Verify the correct ports are being used (backend: 5000, frontend: 5173)
4. Check browser console for specific error messages

## Data Persistence

All data is stored in MongoDB and persists between sessions. The application includes seed data that is automatically loaded if the database is empty.

=======
# fsdproj
>>>>>>> 26982cb133b782fa91eb27a7b25491362606556a
