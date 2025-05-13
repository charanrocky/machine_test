video demo: https://drive.google.com/file/d/16esYHYTAHpw51z9BIPixhZ8DhAHB7fiA/view?usp=sharing

MERN Stack Task Management Application
This is a MERN stack application that allows an Admin User to:
✅ Login
✅ Add Agents
✅ Upload CSV and Distribute Tasks
✅ View Distributed Tasks
Features
✅ Admin Login (with JWT)
✅ Agent Management (Add Agents)
✅ Upload CSV, Validate Format & Distribute Tasks to Agents
✅ Display Distributed Tasks for Each Agent
✅ Secure Authentication with JWT
Setup and Execution
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your-jwt-secret
Start the Backend Server
npm run dev
Frontend Setup
cd ../frontend
npm install
Create a .env file
VITE_API_BASE_URL=http://localhost:5000/api
Start the Frontend
npm run dev
📌 Endpoints Overview
Authentication
Method Endpoint Description
POST /api/auth/register Register a new user
POST /api/auth/login Login user and return JWT token
Agent Management
Method Endpoint Description
POST /api/agents Create a new agent
GET /api/agents Get all agents
Task Management
Method Endpoint Description
POST /api/tasks/upload Upload CSV and distribute tasks
GET /api/tasks Get all tasks and assigned agents
🌟 How to Use
Register and Login as Admin.
Create at least 5 agents.
Upload CSV file to distribute tasks among agents.
View distributed tasks on the frontend.
🚦 Sample Test Data
Sample Agent Creation (POST /api/agents)
json
Copy
Edit
{
"name": "Agent 1",
"email": "agent1@example.com",
"mobile": "+911234567890",
"password": "password123"
}
Sample CSV File
📄 tasks.csv:

csv
Copy
Edit
FirstName,Phone,Notes
John Doe,1234567890,Follow up call
Jane Smith,9876543210,New customer inquiry
Mike Johnson,1231231234,Product feedback
✅ Success Message
✅ Login success → Redirect to dashboard
✅ Tasks distributed → Success message shown
✅ Error messages shown for incorrect inputs

How to Run:

open backend folder and add node server.js
open frontend folder and add npm run dev
