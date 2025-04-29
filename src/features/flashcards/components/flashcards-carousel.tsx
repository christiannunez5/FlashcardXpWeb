import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    FlashcardCarouselItem,
    FlashcardCarouselItemSkeleton,
} from "@/features/flashcards/components/flashcard-carousel-item";
import { TStudySet } from "@/types";
import { useEffect, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CircularButton } from "@/components/ui/circular-button";

interface FlashcardsCarouselProps {
    studySet: TStudySet | undefined;
}

export const FlashcardsCarousel = ({ studySet }: FlashcardsCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    if (!studySet) {
        return <FlashcardCarouselItemSkeleton />;
    }

    return (
        <div className="w-full text-foreground flex flex-col">
            <Carousel className="bg-none" setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                    {studySet.flashcards.map((f) => {
                        return (
                            <CarouselItem key={f.id}>
                                <FlashcardCarouselItem flashcard={f} />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>

            <div className="flex mt-5">
                <div
                    className="bg-primary shadow-sm text-accent-foreground flex items-center mx-auto
                    gap-2 py-2 rounded-4xl px-2"
                >
                    <CircularButton
                        size={10}
                        onClick={() => api?.scrollTo(current - 1)}
                        className="bg-accent text-accent-foreground"
                    >
                        <FaArrowLeft />
                    </CircularButton>

                    <p className="text-foreground mx-8">
                        {current + 1}/{studySet.flashcards.length}
                    </p>

                    <CircularButton
                        size={10}
                        onClick={() => api?.scrollTo(current + 1)}
                        className="bg-accent text-accent-foreground"
                    >
                        <FaArrowRight />
                    </CircularButton>
                </div>

                <div className="flex gap-2 self-start">
                    <CircularButton
                        size={10}
                        className="bg-primary hover:bg-container"
                    >
                        <BsFullscreen />
                    </CircularButton>
                </div>
            </div>
        </div>
    );
};
