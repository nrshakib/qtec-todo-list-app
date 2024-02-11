import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm({ addTodo }) {
  const [formInput, setFormInput] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("incomplete");

  // Functions to control Input Form
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setFormInput(e.target.value);
  };
  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };
  const handleStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formInput.trim() === "") {
      return;
    }

    // Add new Todo
    const newTodo = {
      id: uuidv4(),
      name: formInput,
      priority: priority,
      status: status,
    };
    // Add the new todo to the Todo List
    addTodo(newTodo);

    // Take the form state to the initial state
    setFormInput("");
    setPriority("low");
    setStatus("incomplete");
  };

  return (
    <div className="grid mt-5 text-center justify-center">
      <h1 className="text-2xl font-bold">TODO LIST</h1>
      <form className="mt-5 flex gap-4 sm:gap-1" onSubmit={handleFormSubmit}>
        <input
          type="name"
          placeholder="Add Todo"
          value={formInput}
          onChange={handleInputChange}
          className="border border-black rounded h-10 w-56 px-2"
        />
        <select
          value={priority}
          onChange={handlePriority}
          className="appearance-none w-20 text-center text-black border border-blue-500 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={status}
          onChange={handleStatus}
          className="appearance-none w-24 text-center text-black border border-blue-500 rounded"
        >
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <button
          type="submit"
          className="border border-white rounded px-2 bg-blue-700 text-white"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
