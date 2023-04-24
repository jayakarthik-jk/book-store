import { useEffect, useState } from "react";
import { login } from "../../services/auth";
import { useUser } from "../../context/User";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/users";

interface props {
  flip: boolean;
}

const Login = ({ flip }: props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await getMe();
    if (res instanceof Error) return;
    if (!res.isLoggedIn) return;
    setUser(res.user);
    navigate("/");
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogin = async () => {
    const user = await login(email, password);
    if (user instanceof Error) return setError(user.message);
    setError(null);
    setUser(user);
    navigate("/");
  };

  return (
    <>
      <div
        className={`position-absolute flip ${
          flip ? "flip-login" : ""
        } d-flex flex-column gap-4 justify-content-center align-items-center`}
        style={{ width: "300px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <h4>Login</h4>
        <input
          id="email-login"
          type="email"
          placeholder="Email"
          className="form-control form-control-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password-login"
          type="password"
          placeholder="password"
          className="form-control form-control-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn primary-background text-light align-self-end"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
