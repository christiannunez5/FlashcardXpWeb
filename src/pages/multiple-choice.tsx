import { useGetStudySet } from "@/features/flashcards/hooks";
import { MultipleChoiceCarousel } from "@/features/quiz/components";
import { useParams } from "react-router";

const MultipleChoice = () => {
    const params = useParams();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySet(params.id);

    if (!studySet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-background h-screen flex flex-col">
            <header className="w-full p-4 bg-primary flex items-center justify-center">
                <h4>{studySet.title}</h4>
            </header>

            <main className="w-[70%] flex-1 mx-auto p-10 flex gap-5">
                <section className="w-full h-full">
                    <MultipleChoiceCarousel flashcards={studySet.flashcards} />
                </section>
            </main>
        </div>
    );
};

export default MultipleChoice;
