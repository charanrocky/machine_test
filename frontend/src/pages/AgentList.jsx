import { useEffect, useState } from "react";
import axios from "axios";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Agents fetched:", response.data); // ✅ Debugging
        setAgents(response.data);
      } catch (error) {
        console.error(
          "Error fetching agents:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) return <p>Loading agents...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Agents List</h2>
      {agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <ul className="space-y-2">
          {agents.map((agent) => (
            <li
              key={agent._id}
              className="p-4 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition"
            >
              <div>
                <strong>Name:</strong> {agent.name}
              </div>
              <div>
                <strong>Email:</strong> {agent.email}
              </div>
              <div>
                <strong>Mobile:</strong> {agent.mobile}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentList;
