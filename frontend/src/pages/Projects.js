import { useState, useEffect } from "react";
import { api } from "../utils/api";

export default function Projects() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await api.get("/api/projects");
    setProjects(res.data);
  };

  const addProject = async () => {
    await api.post("/api/projects", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Projects</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      />

      <button onClick={addProject}>Add</button>

      <ul>
        {projects.map(p => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}