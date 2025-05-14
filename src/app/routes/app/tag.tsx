import { MainLayout } from "@/components/layout";
import { PopularStudySets } from "@/features/studysets/components";
import { useGetStudySetsByTag } from "@/features/tags/hooks/get-studysets-by-tag";
import { useParams } from "react-router";

export const Tag = () => {
    const params = useParams();

    if (!params.id) {
        throw new Error("params id cannot be undefined here.");
    }

    const { data } = useGetStudySetsByTag(params.id);

    return (
        <MainLayout>
            <h3>Explore</h3>

            <div className="mt-5">
                <PopularStudySets studySets={data} />
            </div>
        </MainLayout>
    );
};
