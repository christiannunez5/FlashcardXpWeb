import { useAuthContext } from "@/context/auth/hooks";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext();

    if (user === undefined) {
        return <Navigate to="/auth" replace={true} />;
    }

    return children;
};
