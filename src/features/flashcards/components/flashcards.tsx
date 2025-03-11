import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Flashcard } from "@/features/flashcards/components/flashcard";
import { TFlashcard } from "@/types";
import { useEffect, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { FaShuffle } from "react-icons/fa6";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import { CircularButton } from "@/components/ui/circular-button";
import { MdOutlineShuffle } from "react-icons/md";

interface FlashcardsProps {
    flashcards: TFlashcard[];
}

export const Flashcards = ({ flashcards }: FlashcardsProps) => {
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

    return (
        <div className="w-full text-foreground flex flex-col">
            <Carousel
                className="w-full grid "
                setApi={setApi}
                opts={{ loop: false }}
            >
                <CarouselContent>
                    {flashcards.map((f) => {
                        return (
                            <CarouselItem>
                                <Flashcard flashcard={f} />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>

            <div className="flex mt-5">
                <div>
                    <CircularButton
                        size={10}
                        className="bg-primary hover:bg-container"
                    >
                        <MdOutlineShuffle className="text-xl" />
                    </CircularButton>
                </div>

                <div
                    className="bg-primary shadow-xl text-accent-foreground flex items-center mx-auto
                    gap-2 py-2 rounded-4xl px-2"
                >
                    <CircularButton
                        size={10}
                        onClick={() => api?.scrollTo(current - 1)}
                        disabled={current === 0}
                        className="bg-accent text-accent-foreground"
                    >
                        <FaArrowLeft />
                    </CircularButton>

                    <p className="text-foreground mx-8">
                        {current}/{flashcards.length - 1}
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

                    <CircularButton
                        size={10}
                        className="bg-primary hover:bg-container"
                    >
                        <IoSettingsOutline className="text-xl" />
                    </CircularButton>
                </div>
            </div>
        </div>
    );
};
