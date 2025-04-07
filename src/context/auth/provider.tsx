import { AuthContext } from "@/context/auth/context";
import api from "@/lib/axios";
import { TUser } from "@/types";

import { PropsWithChildren, useEffect, useState } from "react";
import { redirect } from "react-router";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<TUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await api.get("/api/auth/me");
                setUser(response.data);
            } catch {
                throw redirect("/auth");
            } finally {
                setIsLoading(false);
            }
        };

        getLoggedInUser();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
