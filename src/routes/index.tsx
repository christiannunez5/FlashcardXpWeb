import { useGetCurrentUser } from "@/hooks/get-current-user";
import { ThemeContextProvider } from "@/providers/theme-context-provider";
import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";
import { Suspense } from "react";
import { BrowserRouter } from "react-router";

const RootNavigator = () => {
    const { data: user } = useGetCurrentUser();

    return (
        <ThemeContextProvider>
            <BrowserRouter>
                <Suspense fallback={<div>Loading.....,.....</div>}>
                    {user !== undefined ? <PrivateRoutes /> : <PublicRoutes />}
                </Suspense>
            </BrowserRouter>
        </ThemeContextProvider>
    );
};

export default RootNavigator;
