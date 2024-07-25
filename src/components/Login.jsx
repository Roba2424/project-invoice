import { useEffect } from "react";
import { useState } from "react";
import API from "../api/constants";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API.users);
        response.json().then((users) => setUsers(users.value));
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  function handleLogin() {
    const userExists = users.find((user) => {
      const condition = user.Name === username && user.Password === password;
      return condition;
    });
    if (userExists) {
      setUser(userExists);
    } else if (username === "" || password === "") {
      alert("Please fill all fields");
    } else {
      alert("User does not exist or wrong pass or name");
    }
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to={"/invoices"}>
        <button type="submit" onClick={handleLogin}>
          Enter
        </button>
      </Link>
    </div>
  );
}
