import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    StudySetDropdownAction,
    studySetDropdownData,
} from "./study-set-drop-down-data";
import { ReactNode } from "react";

interface StudySetCardDropdownProps {
    handleDropdownClick: (
        e: React.MouseEvent,
        action: StudySetDropdownAction
    ) => void;
    children?: ReactNode;
}

export const StudySetCardDropdown: React.FC<StudySetCardDropdownProps> = ({
    handleDropdownClick,
    children,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52 border-2 border-container">
                {studySetDropdownData.map((item) => {
                    return (
                        <DropdownMenuItem
                            className={`hover:bg-container rounded-none p-3.5 space-x-4 
                            ${item.destructive && "text-red-400 "}`}
                            onClick={(e) => handleDropdownClick(e, item.action)}
                        >
                            {/* <Pencil size={20} strokeWidth={2} /> */}
                            <item.icon
                                size={20}
                                strokeWidth={2}
                                className={
                                    item.destructive ? "text-red-400" : ""
                                }
                            />
                            <p>{item.label}</p>
                        </DropdownMenuItem>
                    );
                })}

                {/* <DropdownMenuItem
                    className="hover:bg-container rounded-none p-3.5 space-x-2 "
                    onClick={(e) => handleDropdownClick(e, "edit")}
                >
                    <Lock size={20} strokeWidth={2} />
                    <p>Manage sharing </p>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-container rounded-none p-3.5 space-x-2 ">
                    <GitMerge size={20} strokeWidth={2} />
                    <p>Combine </p>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-container rounded-none p-3.5 space-x-2 ">
                    <FolderInput size={20} strokeWidth={2} />
                    <p>Move to </p>
                </DropdownMenuItem>

                <DropdownMenuItem></DropdownMenuItem>

                <DropdownMenuItem
                    className="hover:bg-container rounded-none p-3.5 space-x-2"
                    onClick={(e) => handleDropdownClick(e, "delete")}
                >
                    <Trash
                        size={20}
                        strokeWidth={2}
                        className="text-destructive"
                    />
                    <p className="text-destructive">Delete set</p>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
