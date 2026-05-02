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

    <input
      placeholder="Enter Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <br /><br />

    <input
      type="password"
      placeholder="Enter Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <br /><br />

    <button onClick={handleLogin}>Login</button>

    <br /><br />

    <p>
      Don't have an account? <a href="/signup">Signup</a>
    </p>
  </div>
);
}