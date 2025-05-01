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
import { Ellipsis } from "lucide-react";
import { Skeleton } from "@/components/shared/skeleton";
import { StudySetRatingModal } from "@/features/studysets/components";
import StarRatings from "react-star-ratings";

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

    return (
        <MainLayout>
            <div className="w-[80%] mx-auto flex flex-col gap-4">
                <div className="p-8 bg-primary space-y-6 rounded-xl">
                    <div className="flex w-full justify-between">
                        {!studySet ? (
                            <Skeleton
                                height={10}
                                width={300}
                                className="mt-5"
                            />
                        ) : (
                            <h3>{studySet.title}</h3>
                        )}

                        <div
                            className="grid place-content-center w-12 h-12 rounded-full
                                border-2 border-container hover:border-accent cursor-pointer"
                        >
                            <Ellipsis />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex gap-3 items-center text-sm">
                            <p>4.5</p>
                            <StarRatings
                                rating={4.5}
                                starRatedColor="#FAAF00"
                                numberOfStars={5}
                                starEmptyColor="gray"
                                starHoverColor="#FAAF00"
                                starDimension="20"
                            />
                            <p>(12)</p>
                            <StudySetRatingModal />
                        </div>

                        <div className="flex items-center ">
                            <img src={brain} alt="" className="h-12" />
                            <p className="font-medium">Studied by 427 people</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    {!studySet ? (
                        <Skeleton width={200} height={10} />
                    ) : (
                        <PracticeOptionsModal studySetId={studySet.id}>
                            <Button
                                className="py-6 px-12 bg-primary rounded-2xl
                                text-foreground hover:text-accent-foreground"
                            >
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
            </div>
        </MainLayout>
    );
};
