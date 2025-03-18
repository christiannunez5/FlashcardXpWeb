import { CircularButton } from "@/components/ui/circular-button";
import { TFlashcard } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

interface FlashcardCarouselItemProps {
    flashcard: TFlashcard;
}

export const FlashcardCarouselItem = ({
    flashcard,
}: FlashcardCarouselItemProps) => {
    const [flipped, setFlipped] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFlipped(!flipped);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    
    return (
        <motion.div
            className="w-full h-[70vh] relative cursor-pointer "
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            style={{
                transformStyle: "preserve-3d",
            }}
            onClick={handleCardClick}
        >
            <div
                className="absolute w-full h-full rounded-2xl shadow-md bg-primary 
                flex flex-col gap-5 p-10"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div onClick={handleEditClick} className="self-end ">
                    <CircularButton size={10} className="hover:bg-container">
                        <FiEdit2 />
                    </CircularButton>
                </div>

                <div className="grow grid place-content-center">
                    <h2 className="">{flashcard.term}</h2>
                </div>
            </div>

            <div
                className="absolute w-full h-full rounded-2xl shadow-md bg-primary 
                flex flex-col gap-5 p-10 rotate-y-180"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div
                    className="flex justify-end bg-amber-900"
                    onClick={handleEditClick}
                ></div>

                <div className="grow grid place-content-center">
                    <p className="text-xl font-medium">
                        {flashcard.definition}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
