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
    useGetStudySetTags,
    useGetUserStudySetRating,
} from "@/features/studysets/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/shared/skeleton";
import {
    AddStudySetTagModal,
    StudySetBasicInfoCard,
    StudySetTags,
} from "@/features/studysets/components";
import { Plus } from "lucide-react";
import { useGetTags } from "@/features/tags/hooks";

export const StudySet = () => {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { user } = useAuthContext();
    const { mutate: addNewRecentStudySet } = useAddRecentStudySet();
    const { mutate: addStudySetRecord } = useAddStudySetRecord(params.id);
    const { data: studySet } = useGetStudySet(params.id);
    const { data: studySetRating } = useGetStudySetRating(params.id);
    const { data: userRating } = useGetUserStudySetRating(params.id);
    const { data: studySetRecord } = useGetStudySetRecord(params.id);
    const { data: tags } = useGetTags();
    const { data: studySetTags } = useGetStudySetTags(params.id);

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

                <div className="bg-primary p-6 rounded-xl space-y-2">
                    <h5>Tags</h5>

                    <div className="flex gap-2">
                        <StudySetTags studySetTags={studySetTags} />

                        <div>
                            {!tags ? (
                                <Skeleton className="h-2 w-12" />
                            ) : (
                                user?.id === studySet?.createdBy.id && (
                                    <AddStudySetTagModal tags={tags}>
                                        <Button
                                            className="p-2 rounded-full border-2 border-container w-fit
                                        px-5"
                                        >
                                            <p className="text-sm">Add tag</p>
                                            <Plus />
                                        </Button>
                                    </AddStudySetTagModal>
                                )
                            )}
                        </div>
                    </div>
                </div>

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
