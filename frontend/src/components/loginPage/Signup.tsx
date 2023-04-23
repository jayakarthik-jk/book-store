import { useState } from "react";
import { signup } from "../../services/users";
import { useUser } from "../../context/User";
import { useNavigate } from "react-router-dom";

interface props {
  flip: boolean;
}

const Signup = ({ flip }: props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleSignup = async () => {
    // checking if the password is more than 8 characters long,
    //  at least one number,
    // one lowercase,
    // one uppercase letter and one special character
    if (password.length < 8) return setError("password is too short");
    if (!password.match(/[0-9]/))
      return setError("password must contain a number");
    if (!password.match(/[a-z]/))
      return setError("password must contain a lowercase letter");
    if (!password.match(/[A-Z]/))
      return setError("password must contain an uppercase letter");
    if (!password.match(/[!@#$%^&*]/))
      return setError("password must contain a special character");
    // checking if the email is valid
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
      return setError("email is not valid");

    const user = await signup(name, email, password);
    if (user instanceof Error) return setError(user.message);
    setError(null);
    setUser(user);
    navigate("/");
  };
  return (
    <>
      <div
        className={`position-absolute flip ${
          !flip ? "flip-login" : ""
        } d-flex flex-column gap-2 justify-content-center align-items-center`}
        style={{ width: "300px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <h4>Sign up</h4>
        <input
          id="name-signup"
          type="text"
          placeholder="Name"
          className="form-control form-control-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="email-signup"
          type="email"
          placeholder="Email"
          className="form-control form-control-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password-signup"
          type="password"
          placeholder="password"
          className="form-control form-control-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn primary-background text-light align-self-end"
          onClick={handleSignup}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Signup;
