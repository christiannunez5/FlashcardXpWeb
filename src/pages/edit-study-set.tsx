import { useNavigate, useParams } from "react-router";
import { EditStudySetForm } from "@/features/studysets/components";
import { useGetStudySet } from "@/features/flashcards/hooks";
import { Button } from "@/components/ui/button";

const EditStudySet = () => {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySet(params.id);

    if (!studySet) {
        return <div>Loading...</div>;
    }

    console.log(studySet);

    return (
        <div className="">
            <div className="w-[85%] mx-auto ">
                <Button
                    className="py-6 px-10"
                    onClick={() => navigate(`/study-set/${params.id}`)}
                >
                    Back to set
                </Button>
            </div>

            <section className="w-[85%] mt-5 mx-auto">
                <EditStudySetForm studySet={studySet} />
            </section>
        </div>
    );
};

export default EditStudySet;
