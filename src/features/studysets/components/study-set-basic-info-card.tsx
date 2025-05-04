import React from "react";
import { Skeleton } from "@/components/shared/skeleton";
import { TStudySet, TStudySetRating } from "@/types";
import { Ellipsis } from "lucide-react";
import StarRatings from "react-star-ratings";
import { StudySetRatingModal } from "./study-set-rating-modal";
import { StudySetCardDropdown } from "@/features/studysets/components/study-sets/study-set-card-drop-down";
import { useDeleteStudySet } from "@/features/studysets/hooks";
import { useNavigate } from "react-router";

interface StudySetBasicInfoCardProps {
    studySet: TStudySet | undefined;
    rating: TStudySetRating | undefined;
    userRating: number | undefined;
}

export const StudySetBasicInfoCard: React.FC<StudySetBasicInfoCardProps> = ({
    studySet,
    rating,
    userRating,
}) => {
    const navigate = useNavigate();
    const { mutate: deleteStudySet } = useDeleteStudySet();

    if (!studySet || !rating || !userRating) {
        return (
            <div className="px-8 py-12 bg-primary space-y-10 rounded-xl">
                <div className="">
                    <Skeleton className="h-2 w-full" />
                </div>

                <div className="flex gap-5 items-center ">
                    <Skeleton className="h-2 w-48" />
                </div>
            </div>
        );
    }

    const handleDropdownClick = (
        e: React.MouseEvent,
        name: "delete" | "edit" | "combine"
    ) => {
        switch (name) {
            case "delete":
                deleteStudySet(studySet.id);
                break;
            case "edit":
                navigate(`/study-set/${studySet.id}/edit`);
                break;
            case "combine":
        }
    };

    return (
        <div className="p-8 bg-primary space-y-6 rounded-xl">
            <div className="flex w-full justify-between ">
                <h3>{studySet.title} Asdasd</h3>

                <StudySetCardDropdown handleDropdownClick={handleDropdownClick}>
                    <div
                        className="grid place-content-center w-12 h-12 rounded-full
                                border-2 border-container hover:border-accent cursor-pointer"
                    >
                        <Ellipsis />
                    </div>
                </StudySetCardDropdown>
            </div>

            <div className="flex gap-2">
                <div className="flex gap-3 items-center text-sm">
                    <p>{rating.averageRating}</p>
                    <div className="pb-1">
                        <StarRatings
                            rating={rating.averageRating}
                            starRatedColor="#FAAF00"
                            numberOfStars={5}
                            starEmptyColor="gray"
                            starHoverColor="#FAAF00"
                            starDimension="20"
                        />
                    </div>
                    <p>({rating.ratedByCount})</p>

                    <StudySetRatingModal userRating={userRating}>
                        <button
                            className="p-2 px-5 border-[0.2px] border-container cursor-pointer
                        rounded-2xl hover:bg-foreground hover:text-primary-foreground"
                        >
                            {userRating === -1 ? "Rate it" : " Update rating"}
                        </button>
                    </StudySetRatingModal>
                </div>

                {/* <div className="flex items-center ">
                    <img src={brain} alt="" className="h-12" />
                    <p className="font-medium">Studied by 427 people</p>
                </div> */}
            </div>
        </div>
    );
};
