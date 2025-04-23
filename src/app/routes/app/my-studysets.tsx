import { MainLayout } from "@/components/layout";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

export const MyStudySets = () => {
    const { data: studySets } = useGetCurrentUserStudySets();
    
    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col">
                <h4>My studysets</h4>
                <section className="mt-3 h-full w-full ">
                    <StudySets studySets={studySets} />
                </section>
            </div>

            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        </MainLayout>
    );
};
