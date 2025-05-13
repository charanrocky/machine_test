import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const uploadTasks = () => {
    navigate("/upload");
  };

  const tasks = () => {
    navigate("/tasks");
  };
  const addAgent = () => {
    navigate("/add-agent");
  };
  const AgentList = () => {
    navigate("/agents");
  };
  const TaskList = () => {
    navigate("/tasks");
  };
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>

        <button
          onClick={uploadTasks}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Upload Tasks
        </button>

        <button
          onClick={tasks}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Tasks
        </button>

        <button
          onClick={addAgent}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Add Agent
        </button>
        <button
          onClick={AgentList}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Agents
        </button>
        <button
          onClick={TaskList}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          TaskList
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
