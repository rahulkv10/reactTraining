import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const dummyUser = { username: "user", password: "pass" };
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([dummyUser]));
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/all-todos");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
