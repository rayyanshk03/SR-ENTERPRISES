# SR ENTERPRISES

A full-stack project with a React frontend and a FastAPI backend.

## Project Overview

This repository contains two main parts:

- `backend/`: a Python FastAPI service with MongoDB integration.
- `frontend/`: a React app bootstrapped with Create React App and configured using CRACO.

## Architecture

### Backend

- Built with FastAPI.
- Uses Motor for asynchronous MongoDB access.
- Provides a REST API under `/api`.
- Includes a simple status check model for creating and retrieving records.
- Configures CORS using environment variables.
- Uses `.env` values for `MONGO_URL`, `DB_NAME`, and `CORS_ORIGINS`.

### Frontend

- Built with React and Create React App.
- Uses CRACO for custom configuration.
- Uses Tailwind CSS for styling.
- Includes a collection of UI components and integrations, including Radix UI packages.
- Uses Axios for API requests.

## Getting Started

### Backend Setup

1. Create and activate a Python virtual environment.
2. Install backend dependencies:

```bash
cd backend
python -m pip install -r requirements.txt
```

3. Create a `.env` file in `backend/` with at least the following values:

```env
MONGO_URL=<your-mongodb-connection-string>
DB_NAME=<your-database-name>
CORS_ORIGINS=http://localhost:3000
```

4. Run the backend service:

```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000/api`.

### Frontend Setup

1. Install frontend dependencies:

```bash
cd frontend
yarn install
```

2. Start the frontend development server:

```bash
yarn start
```

3. Open the app in your browser at `http://localhost:3000`.

## API Endpoints

The backend exposes the following endpoints under `/api`:

- `GET /api/` - health check / root endpoint.
- `POST /api/status` - create a new status check record.
- `GET /api/status` - retrieve saved status check records.

## Useful Commands

### Backend

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
yarn install
yarn start
```

### Build Frontend

```bash
cd frontend
yarn build
```

## Notes

- The frontend is currently configured as a Create React App project using CRACO.
- MongoDB is required for backend data persistence.
- Ensure `CORS_ORIGINS` includes the frontend origin to allow browser access.

## Repository Structure

- `backend/` - FastAPI server, models, routes, and dependencies.
- `frontend/` - React application and UI components.
- `tests/` - Python test package placeholder.
- `test_result.md` - test result summary file.
- `memory/` - workspace memory files.

