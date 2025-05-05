import { useNavigate, useNavigationType, useParams } from "react-router";
import { EditStudySetForm } from "@/features/studysets/components";
import { Button } from "@/components/ui/button";
import { useGetStudySet } from "@/features/studysets/hooks";
import { MainLayout } from "@/components/layout";

export const EditStudySet = () => {
    const params = useParams();
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    if (!params.id) {
        throw new Error("Params is required");
    }

    const studySetId = params.id;

    const { data: studySet } = useGetStudySet(studySetId);

    const handleBack = () => {
        if (navigationType === "POP") {
            navigate("/");
            return;
        }

        navigate(-1);
    };

    return (
        <MainLayout>
            <div className="my-10">
                <section className="w-[85%] mt-5 mx-auto">
                    {!studySet ? null : (
                        <>
                            <EditStudySetForm studySet={studySet} />
                        </>
                    )}
                </section>
            </div>
        </MainLayout>
    );
};
