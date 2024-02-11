function Todo() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form>
        <input type="text" placeholder="Add Task" />
        <select>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todo;
