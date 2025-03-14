import { useNavigate, useParams } from "react-router";
import { EditStudySetForm } from "@/features/studysets/components";
import { useGetStudySetFlashcards } from "@/features/flashcards/hooks";
import { Button } from "@/components/ui/button";

const EditStudySet = () => {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySetFlashcards(params.id);

    if (!studySet) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="w-[85%] space-y-5 mx-auto">
            <Button
                className="py-6 px-10"
                onClick={() => navigate(`/study-set/${params.id}`)}
            >
                Back to set
            </Button>
            <EditStudySetForm studySet={studySet} />
        </div>
    );
};

export default EditStudySet;
