import { Button } from "@/components/ui/button";
import {
    FlashcardList,
    FlashcardsCarousel,
} from "@/features/flashcards/components";
import { useGetStudySet } from "@/features/flashcards/hooks";
import { PracticeOptionsModal } from "@/features/quiz/components";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router";

const StudySet = () => {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySet(params.id);

    useEffect(() => {
        if (studySet?.status === "Draft") {
            navigate(`/study-set/${studySet.id}/edit`);
        }
    }, [studySet, navigate]);

    if (!studySet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[85%] mx-auto flex flex-col gap-4">
            <section className="space-x-2">
                <h1>{studySet?.title}</h1>

                <PracticeOptionsModal studySetId={studySet.id}>
                    <div className="flex justify-end">
                        <Button className="py-5 px-10">Practice</Button>
                    </div>
                </PracticeOptionsModal>

                <div className="flex gap-10 mt-5">
                    <FlashcardsCarousel flashcards={studySet?.flashcards} />
                </div>
            </section>

            <section className="w-full">
                <FlashcardList flashcards={studySet.flashcards}>
                    <div className="self-end">
                        <Button
                            className="p-6 rounded-3xl"
                            onClick={() =>
                                navigate(`/study-set/${studySet.id}/edit`)
                            }
                        >
                            <h5>Add or remove items</h5>
                        </Button>
                    </div>
                </FlashcardList>
            </section>
        </div>
    );
};

export default StudySet;
