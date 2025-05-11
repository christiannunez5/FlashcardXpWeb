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
    useAddStudySetRecord,
    useGetStudySet,
    useGetStudySetRating,
    useGetStudySetRecord,
    useGetUserStudySetRating,
} from "@/features/studysets/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/shared/skeleton";
import { StudySetBasicInfoCard } from "@/features/studysets/components";

export const StudySet = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { mutate: addNewRecentStudySet } = useAddRecentStudySet();
    const { mutate: addStudySetRecord } = useAddStudySetRecord(params.id);
    const { data: studySet } = useGetStudySet(params.id);
    const { data: studySetRating } = useGetStudySetRating(params.id);
    const { data: userRating } = useGetUserStudySetRating(params.id);
    const { data: studySetRecord } = useGetStudySetRecord(params.id);

    useEffect(() => {
        if (studySet) {
            addStudySetRecord(studySet.id);
        }
    }, [studySet, addStudySetRecord]);

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
                <StudySetBasicInfoCard
                    studySet={studySet}
                    rating={studySetRating}
                    userRating={userRating}
                    studySetRecord={studySetRecord}
                />

                <div className="">
                    {!studySet ? (
                        <Skeleton className="h-2 w-36" />
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
