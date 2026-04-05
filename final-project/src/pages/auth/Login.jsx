import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69ca789b3bb225ca08190764"

    );

    const result = await res.json();
    console.log(result);

    const users = Array.isArray(result) ? result : result.data.data;


    const foundUser = users.find((u) => {
      return (
        u.username === username.trim() &&
        u.password === password.trim()
      );
    });

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate(`/${foundUser.role}`);
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;