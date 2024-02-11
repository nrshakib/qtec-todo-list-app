import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  // Save tasks to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Fetch todo data from Local Storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(storedTodos);
    setTodos(storedTodos);
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  return (
    <div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
};

export default Todos;
