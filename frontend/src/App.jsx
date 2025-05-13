import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddAgent from "./pages/AddAgent";
import UploadTasks from "./pages/UploadTasks";
import Tasks from "./pages/Tasks";
import AgentList from "./pages/AgentList";
import TaskList from "./pages/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadTasks />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
