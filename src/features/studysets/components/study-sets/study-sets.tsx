import { StudySetCardSkeleton, StudySetCard } from "./study-set-card";
import { TFolderSummary, TStudySetSummary } from "@/types";
import React from "react";
import flashcardIcon from "@/assets/flash-card.png";
import { EllipsisVertical } from "lucide-react";
import flashcardIcon2 from "@/assets/flash-card-2.png";
import folderIcon from "@/assets/opened-folder.svg";

interface StudySetsProps {
    studySets: TStudySetSummary[] | undefined;
    folders: TFolderSummary[] | undefined;
    isPopular?: boolean;
    view?: "grid" | "list";
}

export const StudySets: React.FC<StudySetsProps> = ({
    studySets,
    isPopular,
    folders,
    view = "list",
}) => {
    // if (!studySets) {
    //     return (
    //         <section className="space-y-3 mt-5">
    //             <h5>Studysets</h5>
    //             <ul className="grid grid-cols-4 gap-4 mt-5">
    //                 {Array.from({ length: 5 }).map(() => (
    //                     <StudySetCardSkeleton />
    //                 ))}
    //             </ul>
    //         </section>
    //     );
    // }

    // if (studySets.length === 0) {
    //     return null;
    // }

    // return (
    //     <section className="space-y-3 mt-5">
    //         <h5>{!isPopular ? "Studysets" : "Popular studysets"}</h5>
    //         <ul className="grid grid-cols-4 gap-4">
    //             {studySets.map((studySet) => (
    //                 <StudySetCard
    //                     studySet={studySet}
    //                     key={studySet.id}
    //                     isPopular={isPopular}
    //                 />
    //             ))}
    //         </ul>
    //     </section>
    // );

    if (!folders || !studySets) {
        return <div>Loading..</div>;
    }

    const items = [
        ...folders.map((folder) => ({
            type: "folder" as const,
            data: folder,
        })),
        ...studySets.map((studySet) => ({
            type: "studysets" as const,
            data: studySet,
        })),
    ];
    
    return (
        <section>
            <ul className="grid grid-cols-4 gap-5">
                {items.map((item) => {
                    if (item.type === "folder") {
                        return (
                            <li className="bg-primary rounded-xl p-4 space-y-4 shadow-xs">
                                <div className="flex justify-between">
                                    <div className="bg-container h-16 w-16 rounded-full p-3">
                                        <img src={folderIcon} />
                                    </div>
                                    <EllipsisVertical
                                        className="text-gray-400"
                                        strokeWidth={3}
                                    />
                                </div>

                                <p className="font-semibold">
                                    {item.data.name}
                                </p>
                            </li>
                        );
                    }

                    return (
                        <li className="bg-primary rounded-xl p-4 space-y-4 shadow-xs">
                            <div className="flex justify-between">
                                <div className="bg-container h-16 w-16 rounded-full p-3">
                                    <img src={flashcardIcon} />
                                </div>
                                <EllipsisVertical
                                    className="text-gray-400"
                                    strokeWidth={3}
                                />
                            </div>

                            <p className="font-semibold">{item.data.title}</p>
                            <p className="text-sm text-gray-500">
                                {item.data.flashcardsCount} terms
                            </p>
                        </li>
                    );
                })}

                {/* {Array.from({ length: 5 }).map(() => {
                    return (
                        <li className="bg-primary rounded-xl p-4 space-y-4 shadow-xs">
                            <div className="flex justify-between">
                                <div className="bg-container h-16 w-16 rounded-full p-3">
                                    <img src={flashcardIcon} />
                                </div>
                                <EllipsisVertical
                                    className="text-gray-400"
                                    strokeWidth={3}
                                />
                            </div>

                            <p className="font-semibold">HCI 101</p>
                            <p className="text-sm text-gray-500">10 terms</p>
                        </li>
                    );
                })}

                <li className="bg-primary rounded-xl p-4 space-y-4 shadow-xs">
                    <div className="flex justify-between">
                        <div className="bg-container h-16 w-16 rounded-full p-3">
                            <img src={folderIcon} />
                        </div>
                        <EllipsisVertical
                            className="text-gray-400"
                            strokeWidth={3}
                        />
                    </div>

                    <p className="font-semibold">MY FOLDER</p>
                </li> */}
            </ul>
        </section>
    );
};
