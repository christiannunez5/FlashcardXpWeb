import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    FlashcardList,
    FlashcardsCarousel,
} from "@/features/flashcards/components";
import { PracticeOptionsModal } from "@/features/quiz/components";
import {
    useAddRecentStudySet,
    useGetStudySet,
} from "@/features/studysets/hooks";

import { useEffect } from "react";

import { useNavigate, useParams } from "react-router";

export const StudySet = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { mutate: addNewRecentStudySet } = useAddRecentStudySet();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySet(params.id);

    useEffect(() => {
        return () => {
            if (studySet) {
                const newRecentStudySet = {
                    id: studySet.id,
                    title: studySet.title,
                    accessedAt: "",
                };

                addNewRecentStudySet(newRecentStudySet);
            }
        };
    }, [addNewRecentStudySet, studySet]);

    useEffect(() => {
        if (studySet?.status === "Draft") {
            navigate(`/study-set/${studySet.id}/edit`);
            return;
        }
    }, [studySet, navigate, addNewRecentStudySet]);

    return (
        <MainLayout>
            <div className="w-[85%] mx-auto flex flex-col gap-4">
                {!studySet ? (
                    ""
                ) : (
                    <>
                        <section className="space-x-2">
                            <h1>{studySet?.title}</h1>

                            <PracticeOptionsModal studySetId={studySet.id}>
                                <div className="flex justify-end">
                                    <Button className="py-5 px-10">
                                        Practice
                                    </Button>
                                </div>
                            </PracticeOptionsModal>

                            <div className="flex gap-10 mt-5">
                                <FlashcardsCarousel
                                    flashcards={studySet?.flashcards}
                                />
                            </div>
                        </section>

                        <section className="w-full">
                            <FlashcardList studySet={studySet}>
                                <div className="self-end">
                                    <Button
                                        className="p-6 rounded-3xl"
                                        onClick={() =>
                                            navigate(
                                                `/study-set/${studySet.id}/edit`
                                            )
                                        }
                                    >
                                        <h5>Add or remove items</h5>
                                    </Button>
                                </div>
                            </FlashcardList>
                        </section>
                    </>
                )}
            </div>
        </MainLayout>
    );
};
