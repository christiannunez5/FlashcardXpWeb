import { WrittenQuizCarousel } from "@/features/quiz/components/";
import { TStudySet } from "@/types";
import { useOutletContext } from "react-router";

export const WrittenQuiz = () => {
    const { studySet } = useOutletContext<{ studySet: TStudySet }>();

    return (
        <section className="w-full h-full">
            <WrittenQuizCarousel flashcards={studySet.flashcards} />
        </section>
    );
};
