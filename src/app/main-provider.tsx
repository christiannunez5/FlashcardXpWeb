import AppRouter from "@/app/router";
import { ThemeContextProvider } from "@/context/theme/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "@/styles/global.css";
import { AuthContextProvider } from "@/context/auth/provider";
import { SidebarContextProvider } from "@/context/sidebar/provider";

const AppProvider = () => {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <ThemeContextProvider>
                        <SidebarContextProvider>
                            <Toaster position="top-left" richColors />
                            <AppRouter />
                        </SidebarContextProvider>
                    </ThemeContextProvider>
                </AuthContextProvider>
            </QueryClientProvider>
        </>
    );
};

export default AppProvider;
