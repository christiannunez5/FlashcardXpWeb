import { TFlashcard } from "@/features/flashcards/components/flashcard";
import { useGetStudySetFlashcards } from "@/features/flashcards/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router";

const StudySet = () => {
    const params = useParams();
    const [flipped, setFlipped] = useState(false);
    if (!params.studySetId) {
        throw new Error("params missing");
    }
    const { data: studySet } = useGetStudySetFlashcards(params.studySetId);

    return (
        <div className="w-[70%] mx-auto h-full flex flex-col">
            <h2>{studySet?.title}</h2>

            <div className="flex gap-2 mt-2">
                <div className="bg-[#07085B] py-2 px-8 rounded-lg text-white">
                    Flashcards
                </div>

                <div className="bg-white py-2 px-8 rounded-lg border border-[#07085B] ">
                    Quiz
                </div>
            </div>

            <motion.div
                className="relative mt-4 flex-1 w-full h-full cursor-pointer"
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
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
                    <h1>Literature</h1>
                </div>

                {/* BACK */}
                <div
                    className="absolute w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center rotate-y-180"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <p>BACK</p>
                </div>
            </motion.div>
        </div>
    );
};

export default StudySet;
