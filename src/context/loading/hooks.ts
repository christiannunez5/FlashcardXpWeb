import { LoadingContext } from "@/context/loading/context";
import { useContext } from "react";

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("Loading context be used within a provider");
    }

    return context;
};
