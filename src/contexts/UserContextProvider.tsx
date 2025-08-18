'use client'

import { createContext} from "react";
import { RoleType } from "../../generated/prisma";


type UserWithoutPassword = {
     name: string;
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    role:RoleType;
}

export const UserContext = createContext <{
    user?: UserWithoutPassword
}> ({});


export default function UserContextProvider({ children, user }: { children: React.ReactNode, user : UserWithoutPassword }) {
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}