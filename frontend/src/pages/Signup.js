import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful");
      nav("/");

    } catch (err) {
      console.log("ERROR:", err);
      console.log("DATA:", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}