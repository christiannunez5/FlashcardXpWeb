import { AuthContext } from "@/context/auth/context";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Auth context be used within a provider");
    }

    return context;
};
