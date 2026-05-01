import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/dashboard")
      .then(res => setData(res.data))
      .catch(() => alert("Error loading dashboard"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f7fb",
      padding: "40px"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <div style={cardStyle("#007bff")}>
            <p>Total</p>
            <h3>{data.total || 0}</h3>
          </div>

          <div style={cardStyle("orange")}>
            <p>Pending</p>
            <h3>{data.pending || 0}</h3>
          </div>

          <div style={cardStyle("green")}>
            <p>Completed</p>
            <h3>{data.completed || 0}</h3>
          </div>
        </div>

        <Link to="/tasks">
          <button style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "10px"
          }}>
            Go to Tasks
          </button>
        </Link>

        <button onClick={logout} style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

const cardStyle = (color) => ({
  flex: 1,
  background: color,
  color: "#fff",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center"
});