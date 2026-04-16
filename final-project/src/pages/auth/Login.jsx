import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69ca789b3bb225ca08190764"
      );

      const result = await res.json();
      const users = Array.isArray(result) ? result : result.data.data;

      const foundUser = users.find(
        (u) =>
          u.username === username.trim() &&
          u.password === password.trim()
      );

      if (foundUser) {
        let finalUser = { ...foundUser };

        // 👨‍🏫 TEACHER
        if (foundUser.role === "teacher") {
          if (foundUser.username === "teacher1") {
            finalUser.subject = "Math";
            finalUser.id = 1;
          }

          if (foundUser.username === "teacher2") {
            finalUser.subject = "English";
            finalUser.id = 2;
          }
        }

        // 👨‍🎓 STUDENT
        if (foundUser.role === "student") {
          if (foundUser.username === "student1") {
            finalUser.id = 1;
          }

          if (foundUser.username === "student2") {
            finalUser.id = 2;
          }

          if (foundUser.username === "student3") {
            finalUser.id = 3;
          }
        }

        // 🔍 DEBUG
        console.log("FINAL USER:", finalUser);

        setUser(finalUser);
        localStorage.setItem("user", JSON.stringify(finalUser));

        navigate(`/${finalUser.role}`);
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-overlay">
        <Card className="login-card">
          <Form layout="vertical">
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Log In
            </h2>

            <Form.Item label="Username">
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Button
              type="primary"
              block
              style={{
                backgroundColor: "#20c997",
                borderColor: "#20c997",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;