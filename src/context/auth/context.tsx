import { TUser } from "@/types";
import { createContext } from "react";

interface AuthContextType {
    user: TUser | undefined;
    setUser: (data: TUser | undefined) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    setUser: () => {},
});
