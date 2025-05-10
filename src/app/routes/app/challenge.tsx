import { MainLayout } from "@/components/layout";
import playerCar from "@/assets/car-1.png";
import opponentCar from "@/assets/car-2.png";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useAuthContext } from "@/context/auth/hooks";
import { useGetStudySet } from "@/features/studysets/hooks";

export const Challenge = () => {
    const { user } = useAuthContext();

    const { data: studySet } = useGetStudySet(
        "a0391a4e-48ee-4c4f-a933-7f04353efdb1"
    );

    const [userAnswer, setUserAnswer] = useState("");
    const [flashcardsAnswered, setFlashcardsAnswered] = useState(0);
    const totalFlashcards = 10;
    const myProgressPercent = (flashcardsAnswered / totalFlashcards) * 100;
    const [opponentProgressPercent, setOpponentProgress] = useState(0);

    const handleSubmitAnswer = (e: FormEvent) => {
        e.preventDefault();
        if (userAnswer.toLowerCase() === "test") {
            setFlashcardsAnswered((prev) => {
                const newCount = prev + 1;
                const progressPercent = (newCount / totalFlashcards) * 100;
                socket.invoke("MoveCar", user?.id, progressPercent);
                return newCount;
            });
        }
    };

    useEffect(() => {
        socket.on("ReceiveMessage", (data) => {
            if (data.payload.userId !== user?.id) {
                setOpponentProgress(data.payload.data);
            }
        });
    }, [user?.id]);

    useEffect(() => {
        socket.on("ReceiveMessage", (data) => {
            console.log(data);
        });
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            socket.invoke("send", "Player quit");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
    }, []);

    if (!studySet) {
        return <div>Loading..</div>;
    }

    return (
        <MainLayout size={80}>
            <div className="bg-primary rounded-lg p-4">
                <Car progressPercent={myProgressPercent} carType="my" />
                <Car
                    progressPercent={opponentProgressPercent}
                    carType="opponent"
                />

                <form
                    className="border-2 border-container p-4 rounded-lg space-y-3"
                    onSubmit={handleSubmitAnswer}
                >
                    <p>
                        A principle in object-oriented programming that
                        restricts access to an object’s internal state and
                        allows it to be modified only through specific methods,
                        promoting modularity and data integrity.
                    </p>
                    <input
                        className="py-2 px-4 rounded-lg outline-none border-2 border-container w-full"
                        placeholder="Enter answer here"
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                </form>
            </div>

            <div>
                <h3>{user?.id}</h3>
                <input className="bg-container p-4" />
                <Button onClick={() => socket.invoke("send", "MEssage")}>
                    Send message
                </Button>
            </div>
        </MainLayout>
    );
};

interface CarProps {
    carType: "my" | "opponent";
    progressPercent: number;
}

const Car: React.FC<CarProps> = ({ carType, progressPercent }) => {
    const carIcon = carType === "my" ? playerCar : opponentCar;

    return (
        <div
            className="relative w-full py-1 border-b-2 border-red-700 border-dashed
                    mt-16 pl-10 "
        >
            <div
                className={`flex gap-2 w-fit items-center absolute bottom-1  transition-transform duration-700
                    `}
                style={{
                    left: `calc(${progressPercent}%)`,
                }}
            >
                <div className="w-20 h-full ">
                    <p>{carType === "my" ? "You" : "Opponent"}</p>
                </div>
                <img src={carIcon} className="h-12 w-12" />
            </div>
        </div>
    );
};
