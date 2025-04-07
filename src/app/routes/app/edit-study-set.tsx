import { useNavigate, useParams } from "react-router";
import { EditStudySetForm } from "@/features/studysets/components";
import { Button } from "@/components/ui/button";
import {
    TUpdateStudySetSchema,
    useGetStudySet,
    useUpdateStudySet,
} from "@/features/studysets/hooks";
import { FlaschcardEditor } from "@/features/flashcards/components";

export const EditStudySet = () => {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySet(params.id);
    const { mutate: updateStudySet, isPending } = useUpdateStudySet();

    const handleBack = () => {
        if (studySet?.status === "Published") {
            navigate(`/study-set/${params.id}`);
        } else {
            navigate(`/my-studysets`);
        }
    };

    const handleUpdateStudySet = (data: TUpdateStudySetSchema) => {
        updateStudySet({
            studySetId: studySet?.id,
            data,
        });
    };

    return (
        <div className="my-10">
            <div className="w-[85%] mx-auto ">
                <Button className="py-6 px-10" onClick={handleBack}>
                    Back
                </Button>
            </div>

            <section className="w-[85%] mt-5 mx-auto">
                {!studySet ? null : (
                    <div>
                        <EditStudySetForm
                            studySet={studySet}
                            onUpdate={handleUpdateStudySet}
                        />
                        <FlaschcardEditor studySet={studySet} />
                        <div className="flex justify-end mt-4">
                            <Button
                                className="py-6 px-10 "
                                type="submit"
                                form="edit-study-set-form"
                            >
                                {isPending ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};
