import { LoadingContext } from "@/context/loading/context";
import { PropsWithChildren, useState } from "react";

export const LoadingContextProvider = ({ children }: PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
