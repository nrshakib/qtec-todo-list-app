import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [editName, setEditName] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

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

  const allTodosCount = todos.length;
  const completedTodosCount = todos.filter(
    (todo) => todo.status === "completed"
  ).length;
  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  className={todo.status === "completed" ? "completed" : ""}
                >
                  {todo.name}
                </span>
                <span>{todo.priority}</span>
                <span>Status: {todo.status}</span>
                <div>
                  <button onClick={() => handleToggleComplete(todo.id)}>
                    {todo.status === "completed"
                      ? "Mark as Incomplete"
                      : "Mark as Completed"}
                  </button>
                  <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <p>Total Tasks: {allTodosCount}</p>
        <p>Completed Tasks: {completedTodosCount}</p>
      </div>
    </div>
  );
};

export default Todos;
