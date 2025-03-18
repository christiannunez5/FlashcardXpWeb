import { useEffect } from "react";

export default function useAutoSave<T>(
    value: T,
    callback: () => void,
    delay: number = 300
) {
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [value, callback, delay]);
}
