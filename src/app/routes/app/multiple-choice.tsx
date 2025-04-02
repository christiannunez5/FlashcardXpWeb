import { MultipleChoiceCarousel } from "@/features/quiz/components";
import { TStudySet } from "@/types";
import { useOutletContext } from "react-router";

const MultipleChoice = () => {
    const { studySet } = useOutletContext<{ studySet: TStudySet }>();

    return (
        <section className="w-full h-full">
            <MultipleChoiceCarousel flashcards={studySet.flashcards} />
        </section>
    );
};

export default MultipleChoice;
