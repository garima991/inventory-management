'use client'

import { createContext, ReactNode, useState} from "react";
import { RoleType } from "../../generated/prisma";


type UserWithoutPassword = {
    name: string;
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    role:RoleType;
}

export const UserContext = createContext<{
  user?: UserWithoutPassword;
  setUser?: (user: UserWithoutPassword) => void;
}>({});

export default function UserContextProvider({ children, user: initialUser }: { children: ReactNode; user: UserWithoutPassword }) {
  const [user, setUser] = useState<UserWithoutPassword>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}