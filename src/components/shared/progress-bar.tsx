import { useEffect, useRef } from "react";
import { useNavigation } from "react-router";
import type { LoadingBarRef } from "react-top-loading-bar";
import LoadingBar from "react-top-loading-bar";

export const ProgressBar = () => {
    const navigation = useNavigation();
    const ref = useRef<LoadingBarRef>(null);

    useEffect(() => {
        if (navigation.state === "loading") {
            ref.current?.continuousStart();
        } else if (navigation.state === "idle") {
            ref.current?.complete();
        }
    }, [navigation.state]);

    return (
        <LoadingBar
            ref={ref}
            color="#533de0"
            shadow={false}
            height={5}
            transitionTime={100}
            waitingTime={300}
        />
    );
};
