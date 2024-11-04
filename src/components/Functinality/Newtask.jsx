import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;



export default function Createtask({ setTodos }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const comback = () => {
    navigate("/Homepage");
  };

  const handleAddTodo = async () => {
    setError("");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/user/newtask`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Todo added successfully: ${data.msg}`);
        setTodos(data.updatedTask);
        console.log(`updated task is `, data.updatedTask);
        // navigate("/Homepage");
      } else {
        setError(`Error adding todo: ${data.msg}`);
      }
    } catch (error) {
      setError(`Error adding todo: ${error.message}`);
    }
  };

  return (
    <div className="bg-[#f0ebff] poppins-medium p-4 rounded-lg max-w-md mx-auto mt-10 shadow-lg">
      <button
        onClick={comback}
        className="mb-4 p-2 bg-white text-black rounded-3xl w-[80px] hover:bg-[#f1ecff] transition duration-200"
      >
        Back
      </button>

      <h2 className="text-lg font-semibold mb-4 text-black">Add a New Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-black mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            className="w-full p-2 mt-1 bg-white text-black rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-black mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            className="w-full p-2 mt-1 bg-white text-black rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          className="w-full p-2 bg-white text-black rounded-3xl hover:bg-[#f1ecff] transition duration-200 mt-4"
          onClick={handleAddTodo}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
