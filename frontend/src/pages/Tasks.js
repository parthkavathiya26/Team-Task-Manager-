import { useEffect, useState } from "react";
import { api } from "../api"; // ✅ FIXED PATH

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  // ✅ Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Fetch Tasks Error:", err.response?.data);
    }
  };

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Fetch Users Error:", err.response?.data);
    }
  };

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Fetch Projects Error:", err.response?.data);
    }
  };

  // ✅ Add Task (MAIN FIX)
  const addTask = async () => {
    try {
      if (!title) return alert("Enter title");

      if (!assignedTo) return alert("Select user");
      if (!project) return alert("Select project");

      await api.post("/api/tasks", {
        title,
        assignedTo,
        project,
      });

      alert("Task Created ✅");

      setTitle("");
      setAssignedTo("");
      setProject("");

      fetchTasks();

    } catch (err) {
      console.log("ADD TASK ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Task failed ❌");
    }
  };

  // ✅ Mark Done
  const markDone = async (id) => {
    try {
      await api.put(`/api/tasks/${id}`, {
        status: "Done",
      });
      fetchTasks();
    } catch (err) {
      console.log("Mark Done Error:", err.response?.data);
    }
  };

  // ✅ Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("Delete Error:", err.response?.data);
    }
  };

  // ✅ Load Data
  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Task Manager</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select value={project} onChange={(e) => setProject(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title} - {t.status}

            {t.status !== "Done" && (
              <button onClick={() => markDone(t._id)}>Done</button>
            )}

            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}