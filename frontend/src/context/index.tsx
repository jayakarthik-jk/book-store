import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import UserContentProvider from "./User";

const Context = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <UserContentProvider>{children}</UserContentProvider>
    </BrowserRouter>
  );
};

export default Context;
