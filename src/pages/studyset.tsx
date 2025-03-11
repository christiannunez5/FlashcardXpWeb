import { Flashcards } from "@/features/flashcards/components";
import { useGetStudySetFlashcards } from "@/features/flashcards/hooks";
import { ReactNode } from "react";
import { useParams } from "react-router";

const StudySet = () => {
    const params = useParams();

    if (!params.studySetId) {
        throw new Error("params missing");
    }
    const { data: studySet } = useGetStudySetFlashcards(params.studySetId);

    if (!studySet) {
        return;
    }
    return (
        <div className="w-full flex flex-col gap-4">
            <section className="space-x-2 ">
                <h1>{studySet?.title}</h1>

                <div className="flex gap-10 mt-5">
                    <div className="flex flex-col gap-4">
                        <StudySetOption
                            title="Practice Test"
                            description="Take a test on your terms and definition"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-zoom-question"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                    <path d="M10 13l0 .01" />
                                    <path d="M10 10a1.5 1.5 0 1 0 -1.14 -2.474" />
                                </svg>
                            }
                        />

                        <StudySetOption
                            title="Flashcards"
                            description="Study terms and definitions"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="icon icon-tabler icons-tabler-filled icon-tabler-play-card-q"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M17 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm.01 16h-.01a1 1 0 0 0 -.117 1.993l.127 .007a1 1 0 0 0 0 -2m-5.01 -10a3 3 0 0 0 -3 3v2a3 3 0 0 0 4.293 2.708l.5 .5a1 1 0 0 0 1.414 -1.415l-.499 -.5c.187 -.392 .292 -.83 .292 -1.293v-2a3 3 0 0 0 -3 -3m0 2a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.99 -6h-.01a1 1 0 0 0 -.117 1.993l.127 .007a1 1 0 1 0 0 -2" />
                                </svg>
                            }
                        />
                    </div>

                    <Flashcards flashcards={studySet?.flashcards} />
                </div>
            </section>

            <section>asd</section>
        </div>
    );
};

interface StudySetOptionProps {
    title: string;
    description: string;
    icon: ReactNode;
}

const StudySetOption = ({ title, description, icon }: StudySetOptionProps) => {
    return (
        <div
            className="relative flex gap-4 bg-primary py-4 px-5 rounded-3xl shadow-md
                items-center hover:bg-container"
        >
            <a href="" className="absolute inset-0"></a>
            {icon}
            <div>
                <p className="text-xl font-semibold">{title}</p>
                <p className="text-sm ">{description}</p>
            </div>
        </div>
    );
};

export default StudySet;
