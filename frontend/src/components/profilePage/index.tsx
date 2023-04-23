import { useNavigate } from "react-router-dom";

import BooksContainer from "../homePage/BooksContainer";
import { useUser } from "../../context/User";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  return (
    <div className="background min-vh-100 p-5">
      <div>
        <h1 className="text-light "> Welcome back {user?.name}</h1>
        <BooksContainer books={user?.books || []} title="Your Books" />
      </div>
    </div>
  );
};

export default ProfilePage;
