import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [agentTaskCounts, setAgentTaskCounts] = useState({});

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        if (Array.isArray(data)) {
          setTasks(data);

          // ✅ Count tasks per agent
          const counts = data.reduce((acc, task) => {
            const agentName = task.agentId?.name || "Unassigned";
            acc[agentName] = (acc[agentName] || 0) + 1;
            return acc;
          }, {});
          setAgentTaskCounts(counts);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to load tasks", err);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  if (tasks.length === 0) return <p>No tasks available.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Tasks List</h2>

      {/* ✅ Agent-wise task count */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Agent Task Count:</h3>
        <ul>
          {Object.entries(agentTaskCounts).map(([agent, count]) => (
            <li key={agent}>
              {agent}: <strong>{count} tasks</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Task Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Notes</th>
            <th className="border p-2">Assigned Agent</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border p-2">{task.firstName}</td>
              <td className="border p-2">{task.phone}</td>
              <td className="border p-2">{task.notes}</td>
              <td className="border p-2">
                {task.agentId?.name || "Unassigned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
