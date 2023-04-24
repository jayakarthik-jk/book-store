import { Link } from "react-router-dom";
import { useUser } from "../../context/User";

const HeroSection = () => {
  const { user } = useUser();
  return (
    <div
      className="row books-bg"
      style={{
        height: "65vh",
      }}
    >
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
        <h4 className="primary-color">Book Store</h4>
        <h1 className="text-white">
          Buy and sell your text books for best price
        </h1>
        <div className="d-flex gap-2">
          {user ? (
            <>
              <Link to="/profile" className="btn primary-background text-light">
                Profile
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn primary-background text-light">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center"></div>
    </div>
  );
};

export default HeroSection;
