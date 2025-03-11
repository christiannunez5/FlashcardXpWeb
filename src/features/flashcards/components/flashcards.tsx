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

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

interface FlashcardsProps {
    flashcards: TFlashcard[];
}

export const Flashcards = ({ flashcards }: FlashcardsProps) => {
    console.log(flashcards);

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
                <div className="flex gap-2 self-start">
                    <button
                        className="shadow-xl grid place-content-center h-10 w-10 rounded-full bg-primary
                    hover:bg-container"
                    >
                        <BsFullscreen />
                    </button>

                    <button
                        className="shadow-xl grid place-content-center h-10 w-10 rounded-full bg-primary
                    hover:bg-container"
                    >
                        <IoSettingsOutline className="text-xl" />
                    </button>
                </div>

                <div
                    className="bg-primary shadow-xl text-accent-foreground flex items-center mx-auto
                                    gap-2 py-2 rounded-4xl px-2"
                >
                    <button
                        className="p-3 rounded-full bg-accent
                    disabled:bg-slate-500 disabled:text-gray-400"
                        onClick={() => api?.scrollTo(current - 1)}
                        disabled={current === 0}
                    >
                        <FaArrowLeft />
                    </button>

                    <p className="text-foreground mx-8">
                        {current}/{flashcards.length - 1}
                    </p>
                    <button
                        className="p-3 rounded-full bg-accent"
                        onClick={() => api?.scrollTo(current + 1)}
                    >
                        <FaArrowRight />
                    </button>
                </div>

                <div>
                    <button className="shadow-xl grid place-content-center h-10 w-10 rounded-full bg-primary">
                        <FiEdit2 />
                    </button>
                </div>
            </div>
        </div>
    );
};
