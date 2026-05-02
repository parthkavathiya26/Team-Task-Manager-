import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/api/tasks");
    setTasks(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/api/auth/users");
    setUsers(res.data);
  };

  const fetchProjects = async () => {
    const res = await api.get("/api/projects");
    setProjects(res.data);
  };

  const addTask = async () => {
    if (!title) return alert("Enter title");

    await api.post("/api/tasks", {
      title,
      assignedTo,
      project,
    });

    setTitle("");
    setAssignedTo("");
    setProject("");
    fetchTasks();
  };

  const markDone = async (id) => {
    await api.put(`/api/tasks/${id}`, {
      status: "Done",
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

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