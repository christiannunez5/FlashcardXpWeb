import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSocket } from "@/hooks/use-socket";
import { useEffect } from "react";

interface ChallengeAlertDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const ChallengeAlertDialog: React.FC<ChallengeAlertDialogProps> = ({
    open,
    setOpen,
}) => {
    const { send, receive } = useSocket();
    
    const handleCancel = () => {
        console.log("Cancelled");
    };

    const handleAccept = () => {
        send(
            "sendToOne",
            {
                type: "accept-challenge",
                payload: {
                    data: "I accept your challenge",
                },
            },
            "cf929597-e823-406e-90f5-31aa2ab9c17a"
        );
    };

    useEffect(() => {
        receive((data) => {
            if (data.type === "accept-challenge") {
                console.log(data);
            }
        });

        return () => {};
    }, [receive]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle hidden></AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Challenges you to a battle.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        Decline
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAccept}>
                        Accept
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
