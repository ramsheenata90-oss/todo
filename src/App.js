import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");

  // ഡാറ്റ കാണാൻ (Read)
  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios.get(("https://todo-f93l.onrender.com/api/todos"))
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  // (Create)
  const handleSubmit = () => {
    if (title === "") return alert("Please enter a task!");
    axios.post(("https://todo-f93l.onrender.com/api/todos"), { title, completed: false })
      .then(() => {
        setTitle("");
        refreshList();
      });
  };

  //  (Delete)
  const handleDelete = (id) => {
    axios.delete(`("https://todo-f93l.onrender.com/api/todos")${id}/`).then(() => refreshList());
  };

  // (Update)
  const toggleComplete = (item) => {
    axios.put(`("https://todo-f93l.onrender.com/api/todos")${item.id}/`, { ...item, completed: !item.completed })
      .then(() => refreshList());
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "500px", margin: "auto", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Todo App</h2>
        
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            style={{ flex: 1, padding: "10px", borderRadius: "5px 0 0 5px", border: "1px solid #ddd" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: "0 5px 5px 0", cursor: "pointer" }}>Add</button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todoList.map((item) => (
            <li key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #eee", alignItems: "center" }}>
              <span 
                onClick={() => toggleComplete(item)}
                style={{ textDecoration: item.completed ? "line-through" : "none", cursor: "pointer", color: item.completed ? "#888" : "#333" }}
              >
                {item.title}
              </span>
              <button onClick={() => handleDelete(item.id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
