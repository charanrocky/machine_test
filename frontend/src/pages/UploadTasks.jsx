import { useState } from "react";
import { uploadTasks } from "../../services/taskService";

const UploadTasks = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      await uploadTasks(file);
      alert("Tasks uploaded and distributed successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload tasks");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Tasks</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadTasks;
