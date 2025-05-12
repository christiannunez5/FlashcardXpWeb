import { Button } from "@/components/ui/button";
import React from "react";

export const RestartQuiz = () => {
    return (
        <div
            className="min-w-full h-full bg-primary 
            flex flex-col p-12 rounded-lg shadow-md items-center justify-center gap-4"
        >
            <h4 className="text-white text-xl font-semibold mb-4">
                🎉 Congratulations! You’ve finished the study set.
            </h4>

            <div className="flex gap-4">
                <Button
                    className="w-fit py-5 px-10 rounded-full bg-primary"
                    variant={"outline"}
                >
                    Back to studyset
                </Button>
                <Button className="w-fit py-5 px-12 rounded-full">
                    Restart
                </Button>
            </div>
        </div>
    );
};
