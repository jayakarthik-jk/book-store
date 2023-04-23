import { Route, Routes } from "react-router-dom";

import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import UploadPage from "./components/uploadPage";
import NotFound from "./components/common/NotFound";
import ProfilePage from "./components/profilePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/books/upload" Component={UploadPage} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
};

export default App;
