import { TFlashcard } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

interface FlaschardProps {
    flashcard: TFlashcard;
}

export const Flashcard = ({ flashcard }: FlaschardProps) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            className="w-full h-[70vh] relative cursor-pointer"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            style={{
                transformStyle: "preserve-3d",
            }}
            onClick={() => setFlipped(!flipped)}
        >
            {/* FRONT */}
            <div
                className="absolute w-full h-full bg-primary rounded-2xl shadow-md 
                flex flex-col gap-5 p-10"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="grow grid place-content-center">
                    <h2 className="">{flashcard.term}</h2>
                </div>
            </div>

            {/* BACK */}
            <div
                className="absolute w-full h-full bg-primary rounded-2xl shadow-md 
                flex flex-col gap-5 p-10 rotate-y-180"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="grow grid place-content-center">
                    <p className="text-xl font-medium">
                        {flashcard.definition}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
