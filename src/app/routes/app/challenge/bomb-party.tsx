import { MainLayout } from "@/components/layout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { socket } from "@/lib/socket";
import { Hourglass, MoveRight } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export const BombParty = () => {
    const [rotated, setRotated] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [timer, setTimer] = useState(10);
    const [isGameStarted, setIsGameStarted] = useState(false);

    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        socket.invoke("joinRoom", "ABCD");

        socket.on("joined", (players) => {
            setPlayers(players);
        });
    }, []);

    const handleAnswerSubmit = (e: FormEvent) => {
        e.preventDefault();

        const cleanedAnswer = userAnswer.trim().toLowerCase();

        if (cleanedAnswer !== "test") {
            setTimer((prev) => prev - 1);
        }
    };

    const startGame = () => {
        setIsGameStarted(true);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="p-4 bg-primary flex items-center">
                <div className="flex gap-4 justify-center items-center grow">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/4861/4861384.png"
                        className="h-12 w-12"
                    />
                    <h5>Waiting for the other player</h5>
                </div>

                <Button>Leave</Button>
            </div>

            <div className="p-6 grow grid place-content-center">
                <div className="relative flex gap-10 items-center w-fit p-4 m-auto bg-red-400">
                    {players[0] && (
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=marknnz" />
                            </Avatar>
                        </div>
                    )}

                    <MoveRight
                        strokeWidth={1}
                        size={200}
                        className={`transition-transform ease-in-out duration-100 ${
                            rotated ? "rotate-180" : ""
                        }`}
                    />
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/891/891013.png"
                        alt="bomb"
                        className="absolute left-43 z-20 h-20 w-20 bomb-animate"
                    />

                    {players[1] && (
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=marknnz" />
                            </Avatar>
                        </div>
                    )}
                </div>

                {isGameStarted && (
                    <>
                        <div className=" flex gap-4 justify-center font-semibold">
                            <Hourglass className="animate-spin" />
                            <h5>{timer}</h5>
                        </div>

                        <form
                            className="mt-5 bg-primary p-10 space-y-4 rounded-xl break-words"
                            onSubmit={handleAnswerSubmit}
                        >
                            <p>is a process of blablabla.</p>

                            <FormInput
                                className="border-2 border-container px-5"
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
