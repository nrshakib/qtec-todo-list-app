import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [editName, setEditName] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Save todos to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Fetch todo data from Local Storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(storedTodos);
    setTodos(storedTodos);
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "completed" ? "incomplete" : "completed",
            }
          : todo
      )
    );
  };

  const handleEdit = (id) => {
    const editedTodo = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditName(editedTodo.name);
    setEditPriority(editedTodo.priority);
  };

  const handleSaveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, name: editName, priority: editPriority }
          : todo
      )
    );
    setEditTodoId(null);
  };
  //Function to Filter Todos
  const filterTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.priority === filter);
  const handlePriorityFilter = (priority) => {
    setFilter(priority);
  };
  //counter
  const allTodosCount = todos.length;
  const completedTodosCount = todos.filter(
    (todo) => todo.status === "completed"
  ).length;

  return (
    <div className="grid justify-center">
      <TodoForm addTodo={addTodo} />
      <div className="flex gap-4 mt-5">
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded"
            onClick={() => handlePriorityFilter("all")}
          >
            All
          </button>
        </div>
        <div>
          <button
            className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-5 rounded"
            onClick={() => handlePriorityFilter("low")}
          >
            Low
          </button>
        </div>
        <div>
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-5 rounded"
            onClick={() => handlePriorityFilter("medium")}
          >
            Medium
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
            onClick={() => handlePriorityFilter("high")}
          >
            High
          </button>
        </div>
      </div>
      <ul>
        {filterTodos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <div className="flex gap-2 mt-5 items-center pl-2">
                <input
                  type="name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-56 border border-blue-500 rounded"
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="appearance-none w-20 text-center text-black border border-blue-500 rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  className="border-0 rounded bg-green-800 text-white px-2"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex gap-12 mt-5 items-center">
                <p
                  className={`w-36 py-1 font-semibold overflow-hidden focus:overflow-visible {todo.status === "completed" ? "completed" : ""}`}
                >
                  {todo.name}
                </p>
                <p className="w-36">
                  Priority :-
                  <span
                    className={` font-semibold ${
                      todo.priority === "low"
                        ? "text-green-600"
                        : todo.priority === "medium"
                        ? "text-yellow-500"
                        : todo.priority === "high"
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {todo.priority}
                  </span>
                </p>
                <p className="w-36">
                  Status :-
                  <span
                    className={` font-semibold ${
                      todo.status === "completed"
                        ? "text-green-600"
                        : todo.status === "incomplete"
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {todo.status}
                  </span>
                </p>
                <div className="flex gap-2">
                  <button
                    className="border rounded bg-yellow-500 text-white px-2 py-1"
                    onClick={() => handleToggleComplete(todo.id)}
                  >
                    {todo.status === "completed"
                      ? "Mark as Incomplete"
                      : "Mark as Completed"}
                  </button>
                  <button
                    className="border rounded bg-green-800 text-white px-2 py-1"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="border rounded bg-red-600 text-white px-2 py-1"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div className="flex gap-2">
        <p>
          Total Tasks :
          <span className="text-2xl text-blue-600"> {allTodosCount}</span>
        </p>
        <p>
          Completed Tasks :
          <span className="text-2xl text-red-600"> {completedTodosCount}</span>
        </p>
      </div>
    </div>
  );
};

export default Todos;
