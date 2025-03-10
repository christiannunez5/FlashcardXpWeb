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
            className="relative mt-4 flex-1 cursor-pointer"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            style={{
                transformStyle: "preserve-3d",
            }}
            onClick={() => setFlipped(!flipped)}
        >
            {/* FRONT */}
            <div
                className="absolute w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
            >
                <h2>{flashcard.term}</h2>
            </div>

            {/* BACK */}
            <div
                className="absolute w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center rotate-y-180"
                style={{ backfaceVisibility: "hidden" }}
            >
                <p>{flashcard.definition}</p>
            </div>
        </motion.div>
    );
};
