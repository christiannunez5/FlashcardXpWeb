import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa";
import { useThemeContext } from "@/hooks/use-theme-context";
import { CircularButton } from "@/components/ui/circular-button";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks";
import { AddDraftStudySetModal } from "@/components/shared";
import { useGetCurrentUserQuests } from "@/features/quests/hooks";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export const Navbar = () => {
    const { mutate: logout } = useLogout();
    const handleLogout = () => {
        logout();
    };

    const { data: quests } = useGetCurrentUserQuests();

    return (
        <nav className="w-full flex justify-end gap-6 items-center">
            <AddDraftStudySetModal>
                <CircularButton
                    className="bg-accent text-accent-foreground"
                    size={10}
                >
                    <FiPlus />
                </CircularButton>
            </AddDraftStudySetModal>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <CircularButton
                        className="bg-inherit hover:bg-container"
                        size={10}
                    >
                        <FaExclamation />
                    </CircularButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="bg-primary rounded-lg mt-5 mr-10 h-[300px]
                overflow-auto relative z-50 border-[1.5px] border-container"
                >
                    {quests?.map((quest) => {
                        return (
                            <DropdownMenuItem className="flex">
                                <div
                                    className="w-full flex p-2 border-b-2 border-container items-center
                                justify-between gap-4"
                                >
                                    <div className="flex flex-col">
                                        <h5 className="font-bold">
                                            {quest.title}
                                        </h5>
                                        <div className="flex gap-1">
                                            <p>{quest.description}</p>
                                            <p>{quest.xpReward} XP</p>
                                        </div>
                                    </div>

                                    <Button
                                        className="px-7 py-0"
                                        disabled={!quest.isCompleted}
                                    >
                                        Claim
                                    </Button>
                                </div>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleLogout}>Logout</Button>

            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-container"></div>
        </nav>
    );
};

export const ThemeToggle = () => {
    const { isDark, toggleMode } = useThemeContext();

    return (
        <CircularButton
            className="bg-inherit hover:bg-container text-lg"
            onClick={toggleMode}
            size={10}
        >
            {isDark ? <IoMoonOutline /> : <MdOutlineWbSunny />}
        </CircularButton>
    );
};
