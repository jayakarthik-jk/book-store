import { useEffect, useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import { useUser } from "../../context/User";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [flip, setFlip] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user) return navigate("/");
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="row vh-100 login-svg-bg">
        <div className="col-12 col-md-6 login-img d-flex justify-content-center align-items-center">
          {/* <img src="/login.png" alt="Login Image" width="100%" height="100%" /> */}
        </div>
        <div className="col-12 col-md-6 login-container d-flex flex-column justify-content-between align-items-center p-4">
          <div></div>
          <div className="position-relative d-flex justify-content-between align-items-center flex-shrink-0">
            <Login flip={flip} />
            <Signup flip={flip} />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            {flip ? "Already have an account" : "Don't have an account yet"}
            &nbsp;
            <span
              className="login-signup-switch-text"
              onClick={() => setFlip(!flip)}
            >
              {flip ? "login" : "sign up"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
