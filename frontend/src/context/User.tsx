import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMe } from "../services/users";

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
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const res = await getMe();
    if (res instanceof Error) return;
    if (!res.isLoggedIn) return;
    setUser(res.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
