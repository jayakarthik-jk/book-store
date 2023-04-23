import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      Page Not Found
      <NavLink to="/" className="btn primary-background text-light">
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
