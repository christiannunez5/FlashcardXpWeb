import { Button } from "@/components/ui/button";
import { FormEvent, PropsWithChildren, useState } from "react";
import StarRatings from "react-star-ratings";

export const StudySetRatingForm = ({ children }: PropsWithChildren) => {
    const [rating, setRating] = useState(0);

    const handleSubmitRating = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <form className="w-full space-y-4 px-5" onSubmit={handleSubmitRating}>
            <div className="w-fit mx-auto ">
                <StarRatings
                    rating={rating}
                    changeRating={setRating}
                    starRatedColor="#FAAF00"
                    numberOfStars={5}
                    starEmptyColor="gray"
                    starHoverColor="#FAAF00"
                    starDimension="40"
                />
            </div>
            <div className="space-y-3">
                <h5>Write a review</h5>
                <input
                    type="text"
                    className="bg-container w-full rounded-2xl p-4
                h-48 text-sm outline-none"
                    placeholder="What did you like or dislike about it?"
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
