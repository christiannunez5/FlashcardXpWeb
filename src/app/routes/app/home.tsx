import { MainLayout } from "@/components/layout";
import { useAuthContext } from "@/context/auth/hooks";
import { Groups } from "@/features/groups/components";
import { StudySets, RecentStudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";
import { FileBox } from "lucide-react";

export const Home = () => {
    const { data: recentStudySets } = useGetRecentStudySets();
    const { user } = useAuthContext();

    const { data: studySets } = useGetCurrentUserStudySets();

    return (
        <MainLayout>
            <section className="text-foreground space-y-2">
                <h4>Welcome, {user?.email}</h4>
                <div className="">
                    <RecentStudySets recentStudySets={recentStudySets} />
                </div>
            </section>
            <section className="space-y-3 mt-5">
                <h5 className="font-bold">Create</h5>
                <ul className="grid grid-cols-4 gap-4">
                    <li
                        className="rounded-lg bg-primary p-5 space-y-2 shadow-md 
                    hover:border-2 hover:border-container cursor-pointer"
                    >
                        <div
                            className="h-12 w-12 rounded-full bg-accent text-accent-foreground
                        grid place-content-center"
                        >
                            <FileBox />
                        </div>
                        <p>Upload a pdf, ppt, or docx and let AI do the work</p>
                    </li>

                    <li
                        className="rounded-lg bg-primary p-5 space-y-2 shadow-md
                    hover:border-2 hover:border-container transition-colors cursor-pointer"
                    >
                        <div className="h-12 w-12 rounded-full">
                            <img src="" alt="" />
                        </div>
                        <p>Create your flashcards manually</p>
                    </li>
                </ul>
            </section>
            <section className="space-y-3">
                <h5 className="font-bold mt-5">Groups</h5>

                <Groups />
            </section>

            <section className="mt-5">
                <h5>Popular study sets</h5>

                <div className="mt-5">
                    <StudySets studySets={studySets} isPopular />
                </div>
            </section>
        </MainLayout>
    );
};
