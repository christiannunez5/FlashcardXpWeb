import { AuthContext } from "@/context/auth/context";
import api from "@/lib/axios";
import { TUser } from "@/types";
import { AxiosError } from "axios";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<TUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await api.get("/api/auth/me");
                setUser(response.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getLoggedInUser();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
