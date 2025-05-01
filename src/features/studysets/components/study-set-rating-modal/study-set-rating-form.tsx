import { Button } from "@/components/ui/button";
import {
    addStudySetRatingSchema,
    TAddStudySetRatingSchema,
    useAddStudySetRating,
    useUpdateStudySetRating,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import StarRatings from "react-star-ratings";

interface StudySetRatingFormProps {
    children: ReactNode;
    onSubmitCallback: () => void;
    userRating: number;
}

export const StudySetRatingForm: React.FC<StudySetRatingFormProps> = ({
    children,
    onSubmitCallback,
    userRating,
}) => {
    const params = useParams();
    
    if (!params.id) {
        throw new Error("Params is required");
    }

    const studySetId: string = params.id;

    const { mutate: addRating } = useAddStudySetRating(studySetId);
    const { mutate: updateRating } = useUpdateStudySetRating(studySetId);

    const handleAddRating = () => {
        const data = getValues();
        const addRatingData = {
            studySetId,
            data,
        };

        if (userRating !== -1) {
            updateRating(addRatingData, {
                onSuccess: () => {
                    onSubmitCallback();
                },
            });
            return;
        }

        addRating(addRatingData, {
            onSuccess: () => {
                onSubmitCallback();
            },
        });
    };

    const { register, handleSubmit, getValues, control } =
        useForm<TAddStudySetRatingSchema>({
            resolver: zodResolver(addStudySetRatingSchema),
            defaultValues: {
                rating: 0,
                reviewText: "",
            },
        });

    return (
        <form
            className="w-full space-y-4 px-5"
            onSubmit={handleSubmit(handleAddRating)}
        >
            <div className="w-fit mx-auto ">
                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <StarRatings
                            rating={field.value}
                            changeRating={field.onChange}
                            starRatedColor="#FAAF00"
                            numberOfStars={5}
                            starEmptyColor="gray"
                            starHoverColor="#FAAF00"
                            starDimension="40px"
                        />
                    )}
                />
            </div>
            <div className="space-y-3">
                <h5>Write a review</h5>
                <input
                    type="text"
                    className="bg-container w-full rounded-2xl p-4
                h-48 text-sm outline-none"
                    placeholder="What did you like or dislike about it?"
                    {...register("reviewText")}
                />
            </div>

            <div className="space-x-4 w-fit ml-auto">
                {children}
                <Button type="submit" className="px-10">
                    Submit
                </Button>
            </div>
        </form>
    );
};
