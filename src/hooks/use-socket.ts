import { socket } from "@/lib/socket";

export type TMessageReceiveType<T> = {
    type: "new-challenge";
    payload: { userId: string; data: T };
};

export type TSendMessageType<T> = {
    type: "new-challenge";
    payload: { userId: string; data: T };
};

export const useSocket = () => {
    const send = <T>(
        option: "sendToOne" | "sendToAll",
        message: TSendMessageType<T>,
        userId?: string
    ) => {
        socket.send(option, userId, message);
    };
    
    const receive = <T>(callback: (data: TMessageReceiveType<T>) => void) => {
        socket.on("ReceiveMessage", (data: TMessageReceiveType<T>) => {
            callback(data);
        });
    };

    return {
        send,
        receive,
    };
};
