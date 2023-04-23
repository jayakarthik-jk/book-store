import { Link } from "react-router-dom";
import { useUser } from "../../context/User";

const HeroSection = () => {
  const { user } = useUser();
  return (
    <div
      className="row"
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
              <Link
                to="/books/upload"
                className="btn primary-background text-light"
              >
                Upload
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn primary-background text-light">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, enim
        sed explicabo quasi alias suscipit voluptate. Delectus, aperiam incidunt
        minus totam ratione ex nihil maiores, amet aliquid error sunt suscipit.
      </div>
    </div>
  );
};

export default HeroSection;
