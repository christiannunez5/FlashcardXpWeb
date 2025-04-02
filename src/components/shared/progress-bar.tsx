import { useEffect } from "react";
import { useNavigation } from "react-router";
import NProgress from "nprogress";
import "@/styles/progress-bar.css";

export const ProgressBar = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === "loading") {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [navigation.state]);

    return null;
};
