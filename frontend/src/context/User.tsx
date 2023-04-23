import { ReactNode, createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  id: string;
  books: Book[];
}
interface Book {
  id: string;
  title: string;
  author: string;
  userId: string;
}

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: any) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
