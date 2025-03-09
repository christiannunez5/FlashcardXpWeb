import { useGetFlashcardsByStudySet } from "@/features/flashcards/hooks";
import { useParams } from "react-router";

const StudySet = () => {
    const params = useParams();

    if (!params.studySetId) {
        throw new Error("params missing");
    }
    const { data: flashcardsByStudySet } = useGetFlashcardsByStudySet(
        params.studySetId
    );
    
    return (
        <div className="w-[70%] mx-auto">
            <h1 className="text-4xl font-bold">
                {flashcardsByStudySet?.title}
            </h1>
        </div>
    );
};

export default StudySet;
