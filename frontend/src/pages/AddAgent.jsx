import { useState } from "react";
import { addAgent } from "../../services/agentService";

const AddAgent = () => {
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAgent(agent);
      alert("Agent added successfully");
    } catch (err) {
      alert("Error adding agent");
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
      >
        <h2 className="text-xl font-bold mb-4">Add Agent</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setAgent({ ...agent, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setAgent({ ...agent, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Mobile"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setAgent({ ...agent, mobile: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setAgent({ ...agent, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
        >
          Add Agent
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
