import React, { createContext, ReactNode, useState } from "react";
import { User } from "@/interfaces/user";

export interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}