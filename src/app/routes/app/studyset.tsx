import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth/hooks";
import {
    FlashcardList,
    FlashcardsCarousel,
} from "@/features/flashcards/components";
import { PracticeOptionsModal } from "@/features/quiz/components";
import {
    useAddRecentStudySet,
    useGetStudySet,
} from "@/features/studysets/hooks";
import brain from "@/assets/brain.svg";

import { useEffect } from "react";

import { useNavigate, useParams } from "react-router";
import { Ellipsis, Star } from "lucide-react";
import { Skeleton } from "@/components/shared/skeleton";

export const StudySet = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { mutate: addNewRecentStudySet } = useAddRecentStudySet();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySet(params.id);

    useEffect(() => {
        return () => {
            if (studySet) {
                const newRecentStudySetData = {
                    studySetId: studySet.id,
                };
                addNewRecentStudySet(newRecentStudySetData);
            }
        };
    }, [addNewRecentStudySet, studySet, user]);

    useEffect(() => {
        if (studySet?.status === "Draft") {
            navigate(`/study-set/${studySet.id}/edit`);
            return;
        }
    }, [studySet, navigate, addNewRecentStudySet]);

    console.log(studySet);
    return (
        <MainLayout>
            <div className="w-[80%] mx-auto flex flex-col gap-4">
                <div className="p-8 bg-primary rounded-xl flex justify-between">
                    <div className="flex justify-between">
                        {!studySet ? (
                            <Skeleton
                                height={10}
                                width={300}
                                className="mt-5"
                            />
                        ) : (
                            <h3>{studySet.title}</h3>
                        )}
                    </div>

                    <div
                        className="grid place-content-center w-12 h-12 rounded-full
                                border-2 border-foreground hover:border-accent cursor-pointer"
                    >
                        <Ellipsis />
                    </div>
                </div>

                <div className="">
                    {!studySet ? (
                        <Skeleton width={200} height={10} />
                    ) : (
                        <PracticeOptionsModal studySetId={studySet.id}>
                            <Button className="py-6 px-12 bg-primary rounded-2xl">
                                Practice
                            </Button>
                        </PracticeOptionsModal>
                    )}
                </div>

                <section>
                    <FlashcardsCarousel studySet={studySet} />
                </section>

                <section>
                    <FlashcardList studySet={studySet}>
                        {user?.id === studySet?.createdBy.id && (
                            <div className="self-end">
                                <Button
                                    className="p-6 rounded-3xl"
                                    onClick={() =>
                                        navigate(
                                            `/study-set/${studySet?.id}/edit`
                                        )
                                    }
                                >
                                    <h5>Add or remove items</h5>
                                </Button>
                            </div>
                        )}
                    </FlashcardList>
                </section>
                {/*
                    <section className="space-x-2">
                        <div className="mt-5 ">
                            <PracticeOptionsModal studySetId={studySet.id}>
                                <Button className="py-6 px-12 bg-primary rounded-2xl">
                                    Practice
                                </Button>
                            </PracticeOptionsModal>
                        </div>

                        <div className="flex gap-10 mt-5">
                            <FlashcardsCarousel
                                flashcards={studySet?.flashcards}
                            />
                        </div>

                        <div className="mt-5 p-6 bg-primary rounded-2xl space-y-2">
                            <h5>Description and tags</h5>
                            { <p>{studySet.description}</p> }

                            <ul className="flex gap-2">
                                <div className="text-sm bg-none border-1 border-foreground py-1.5 px-5 rounded-3xl cursor-pointer">
                                    Science
                                </div>

                                <button
                                    className="text-sm bg-none border-2 border-container
                                py-1.5 px-5 rounded-3xl cursor-pointer hover:bg-accent
                                hover:text-accent-foreground
                                transition-colors duration-100 ease-in-out "
                                >
                                    Add tags
                                </button>
                            </ul>
                        </div>
                    </section>

                    <section className="w-full">
                        <FlashcardList studySet={studySet}>
                            {user?.id === studySet.createdBy.id && (
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
                            )}
                        </FlashcardList>
                    </section>
                </> */}
            </div>
        </MainLayout>
    );
};
