import { useGetCurrentUser } from "@/hooks/get-current-user";
import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";
import { Suspense } from "react";
import { BrowserRouter } from "react-router";

const RootNavigator = () => {
    const { data: user } = useGetCurrentUser();
    
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading.....,.....</div>}>
                {user !== null ? <PrivateRoutes /> : <PublicRoutes />}
            </Suspense>
        </BrowserRouter>
    );
};

export default RootNavigator;
