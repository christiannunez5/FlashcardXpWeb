// import { Button } from "@/components/ui/button";
// import { useDeleteFlashcard } from "@/features/flashcards/hooks";
// import { TStudySet } from "@/types";
// import React, { useState } from "react";

// interface FlashcardEditorProps {
//     studySet: TStudySet;
// }

// export const FlaschcardEditor: React.FC<FlashcardEditorProps> = ({
//     studySet,
// }) => {
//     const { mutate: deleteFlashcard } = useDeleteFlashcard(studySet.id);
//     const [cardCount, setCardCount] = useState("1");
//     const [flashcards, setFlashcards] = useState(studySet.flashcards);

//     const handleAddFlashcardComponent = () => {
//         const newFlashcards = Array.from({ length: Number(cardCount) }, () => ({
//             id: "",
//             term: "",
//             definition: "",
//         }));
//         setFlashcards([...flashcards, ...newFlashcards]);
//         setCardCount("1");
//     };

//     const deleteFlashcardComponent = (index: number) => {
//         const updatedFlashcards = flashcards.filter((_, i) => i !== index);
//         setFlashcards(updatedFlashcards);
//     };

//     const handleDeleteFlashcard = (index: number, id?: string) => {
//         if (id) {
//             deleteFlashcard(id, {});
//         }
//         deleteFlashcardComponent(index);
//     };

//     return (
//         <section className="space-y-4 mt-4">
//             <ul className="space-y-4">
//                 {flashcards.map((flashcard, index) => {
//                     return (
//                         <EditFlashcardForm
//                             key={flashcard.id}
//                             flashcard={flashcard}
//                             index={index}
//                             isDeleteDisabled={flashcards.length <= 4}
//                             onDelete={() => {
//                                 handleDeleteFlashcard(index, flashcard.id);
//                             }}
//                         />
//                     );
//                 })}
//             </ul>

//             <div className="bg-primary w-full rounded-xl p-6 flex gap-2 justify-center">
//                 <Button
//                     type="button"
//                     onClick={handleAddFlashcardComponent}
//                     className="px-6 "
//                 >
//                     Add Card/s
//                 </Button>

//                 <input
//                     className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
//                             border-xl outline-none ring-[1.5px] ring-gray-800 dark:ring-white
//                             w-24 rounded-3xl px-4 focus:ring-accent"
//                     value={cardCount}
//                     type="text"
//                     onChange={(e) => setCardCount(e.target.value)}
//                 />
//             </div>
//         </section>
//     );
// };
