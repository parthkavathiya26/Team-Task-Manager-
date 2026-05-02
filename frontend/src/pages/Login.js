import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://team-task-manager-production-02b2.up.railway.app/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      nav("/dashboard");

    } catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.message || "Login failed");
}
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      {/* EMAIL INPUT */}
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px"
        }}
      />

      <br />

      {/* PASSWORD INPUT */}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px"
        }}
      />

      <br />

      {/* BUTTON */}
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Login
      </button>
    </div>
  );
}