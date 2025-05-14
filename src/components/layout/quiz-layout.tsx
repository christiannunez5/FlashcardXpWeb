import { useGetStudySet } from "@/features/studysets/hooks";
import { X } from "lucide-react";
import { Outlet, useNavigate, useParams } from "react-router";

export const QuizLayout = () => {
    const params = useParams();

    const navigate = useNavigate();

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
                <h4 className="grow text-center">{studySet.title}</h4>

                <div
                    className="p-2 cursor-pointer rounded-full hover:bg-container"
                    onClick={() => navigate(`/study-set/${studySet.id}`)}
                >
                    <X size={20} strokeWidth={2} />
                </div>
            </header>

            <main className="w-[70%] flex-1 mx-auto p-10 flex gap-5">
                <Outlet context={{ studySet }} />
            </main>
        </div>
    );
};
