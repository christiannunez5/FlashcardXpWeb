import {
    TUpdateFullStudySetSchema,
    updateFullStudySetSchema,
    useUpdateFullStudySet,
    useUpdateStudySet,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { TStudySet } from "@/types";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    useDeleteFlashcard,
    useUpdateFlashcard,
} from "@/features/flashcards/hooks";
import { FlashcardFormSection } from "./flashcard-form-section";
import { useNavigate } from "react-router";
import { handleZodErrors } from "@/utils";
import { StudySetField } from "./study-set-field";
import useDebounce from "@/hooks/use-debouce";
import { arrayMove, List } from "react-movable";

interface EditStudySetFormProps {
    studySet: TStudySet;
}

export const EditStudySetForm: React.FC<EditStudySetFormProps> = ({
    studySet,
}) => {
    const methods = useForm<TUpdateFullStudySetSchema>({
        resolver: zodResolver(updateFullStudySetSchema),
        defaultValues: studySet,
    });

    const {
        getValues,
        setValue,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = methods;

    const navigate = useNavigate();

    const isFirstRender = useRef(true);

    const [cardCount, setCardCount] = useState("1");

    const { mutate: updateFullStudySet, isPending } = useUpdateFullStudySet();
    const { mutate: deleteFlashcard } = useDeleteFlashcard(studySet.id);
    const { mutate: updateStudySetBasicInfo } = useUpdateStudySet();
    const { isPending: isUpdateFlashcardPending } = useUpdateFlashcard(
        studySet.id
    );

    const title = watch("title");

    const description = watch("description");

    const debouncedTitle = useDebounce(title);
    const debouncedDescription = useDebounce(description);

    const handleUpdateStudySetBasicInfo = useCallback(() => {
        const data = {
            title: debouncedTitle,
            description: debouncedDescription,
        };

        updateStudySetBasicInfo({
            studySetId: studySet.id,
            data,
        });
    }, [
        debouncedTitle,
        debouncedDescription,
        updateStudySetBasicInfo,
        studySet.id,
    ]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handleUpdateStudySetBasicInfo();
    }, [handleUpdateStudySetBasicInfo]);

    const flashcards = watch("flashcards");

    const handleUpdateFullStudySet = useCallback(async () => {
        const data = getValues();
        if (!isUpdateFlashcardPending) {
            updateFullStudySet(
                { studySetId: studySet.id, data },
                {
                    onSuccess: () => {
                        navigate(`/study-set/${studySet.id}`);
                    },
                }
            );
        }
    }, [
        getValues,
        studySet.id,
        updateFullStudySet,
        navigate,
        isUpdateFlashcardPending,
    ]);

    const handleAddFlashcardComponent = () => {
        const currentFlashcards = getValues("flashcards");

        const newFlashcards = Array.from({ length: Number(cardCount) }, () => ({
            term: "",
            definition: "",
        }));

        setValue("flashcards", [...currentFlashcards, ...newFlashcards]);
        setCardCount("1");
    };

    const handleDeleteFlashcard = (index: number, id?: string) => {
        if (id) {
            deleteFlashcard(id, {});
        }

        const currentFlashcards = getValues("flashcards");
        const updatedFlashcards = currentFlashcards.filter(
            (_, i) => i !== index
        );
        setValue("flashcards", updatedFlashcards);
    };

    // TODO : save to database the flashcards order
    const handleReOrder = async (oldIndex: number, newIndex: number) => {
        const updated = arrayMove(flashcards, oldIndex, newIndex).map(
            (card, index) => ({
                id: card.id,
                position: index,
            })
        );

        setValue("flashcards", arrayMove(flashcards, oldIndex, newIndex));
    };

    return (
        <FormProvider {...methods}>
            <form
                className="w-full space-y-4"
                id="edit-study-set-form"
                onSubmit={handleSubmit(handleUpdateFullStudySet, (errors) => {
                    handleZodErrors(errors);
                })}
            >
                <StudySetField
                    title="Title"
                    placeholder="Enter a title, like 'Literature 11'"
                    error={errors.title}
                    register={register("title")}
                />

                <StudySetField
                    title="Description"
                    placeholder="Add a description"
                    error={errors.description}
                    register={register("description")}
                />

                <List
                    values={flashcards}
                    onChange={({ oldIndex, newIndex }) =>
                        handleReOrder(oldIndex, newIndex)
                    }
                    renderList={({ children, props }) => (
                        <ul {...props} className="space-y-4">
                            {children}
                        </ul>
                    )}
                    renderItem={({ value, props, index }) => (
                        <li {...props} className="list-none">
                            <FlashcardFormSection
                                key={index}
                                studySetId={studySet.id}
                                index={index}
                                isDeleteDisabled={flashcards.length <= 4}
                                onDelete={() => {
                                    handleDeleteFlashcard(index, value.id);
                                }}
                            />
                        </li>
                    )}
                />

                {/* <ul className="space-y-4">
                    {flashcards.map((flashcard, index) => {
                        return (
                            <FlashcardFormSection
                                key={flashcard.id}
                                studySetId={studySet.id}
                                index={index}
                                isDeleteDisabled={flashcards.length <= 4}
                                onDelete={() => {
                                    handleDeleteFlashcard(index, flashcard.id);
                                }}
                            />
                        );
                    })}
                </ul> */}

                <div
                    className="bg-primary w-full rounded-xl p-6 flex gap-2 justify-center
                shadow-lg"
                >
                    <Button
                        type="button"
                        onClick={handleAddFlashcardComponent}
                        className="px-6 "
                    >
                        Add Card/s
                    </Button>

                    <input
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    border-xl outline-none ring-[1.5px] ring-gray-800 dark:ring-white 
                    w-24 rounded-3xl px-4 focus:ring-accent"
                        value={cardCount}
                        type="text"
                        onChange={(e) => setCardCount(e.target.value)}
                    />
                </div>

                <div className="flex justify-end ">
                    <Button
                        className="py-6 px-10 "
                        type="submit"
                        disabled={isPending}
                    >
                        {studySet.status === "Published" ? "Save" : "Create"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
