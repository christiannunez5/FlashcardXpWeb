import { useNavigate, useParams } from "react-router";
import { EditStudySetForm } from "@/features/studysets/components";
import { Button } from "@/components/ui/button";
import {
    TUpdateFullStudySetSchema,
    updateFullStudySetSchema,
    useGetStudySet,
} from "@/features/studysets/hooks";
import { FlaschcardEditor } from "@/features/flashcards/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditStudySet = () => {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        throw new Error("Params is required");
    }

    const studySetId = params.id;

    const { data: studySet } = useGetStudySet(studySetId);
    // const { mutate: updateStudySet, isPending } = useUpdateStudySet();

    const handleBack = () => {
        if (studySet?.status === "Published") {
            navigate(`/study-set/${studySetId}`);
        } else {
            navigate(`/my-studysets`);
        }
    };

    // const handleUpdateStudySet = () => {
    //     updateStudySetStatus({ studySetId: studySetId });
    // };

    return (
        <div className="my-10">
            <div className="w-[85%] mx-auto ">
                <Button className="py-6 px-10" onClick={handleBack}>
                    Back
                </Button>
            </div>

            <section className="w-[85%] mt-5 mx-auto">
                {!studySet ? null : (
                    <>
                        <EditStudySetForm studySet={studySet} />
                    </>
                )}
            </section>
        </div>
    );
};
