import { Skeleton } from "@/components/shared/skeleton";
import { TFlashcard } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router";

interface FlashcardCarouselItemProps {
    flashcard: TFlashcard;
}

export const FlashcardCarouselItem = ({
    flashcard,
}: FlashcardCarouselItemProps) => {
    const { id: studySetId } = useParams();

    if (!studySetId) {
        throw new Error("params is required");
    }

    const [flipped, setFlipped] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFlipped(!flipped);
    };

    return (
        <motion.div
            className="w-full h-[70vh] relative cursor-pointer"
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
                <div className="grow grid place-content-center">
                    <h2 className="">{flashcard.term}</h2>
                </div>
            </div>

            <div
                className="absolute w-full h-full rounded-2xl shadow-md bg-primary 
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

export const FlashcardCarouselItemSkeleton = () => {
    return (
        <div className="w-full flex flex-col bg-primary rounded-2xl h-[70vh] items-center justify-center">
            <Skeleton height={10} width={500} />
        </div>
    );
};
