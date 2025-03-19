import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router";

enum PracticeType {
    Matching = "Matching Type",
    MultiplceChoice = "Multiple Choice",
    Written = "Written",
}

interface PracticeOptionsModalProps {
    children: ReactNode;
    studySetId: string;
}

export const PracticeOptionsModal = ({
    studySetId,
    children,
}: PracticeOptionsModalProps) => {
    const [options, setOptions] = useState({
        quizType: PracticeType.Written,
    });

    const practiceOptionsType = [
        {
            type: PracticeType.Matching,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-a-b-2"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 21h3c.81 0 1.48 -.67 1.48 -1.48l.02 -.02c0 -.82 -.69 -1.5 -1.5 -1.5h-3v3z" />
                    <path d="M16 15h2.5c.84 -.01 1.5 .66 1.5 1.5s-.66 1.5 -1.5 1.5h-2.5v-3z" />
                    <path d="M4 9v-4c0 -1.036 .895 -2 2 -2s2 .964 2 2v4" />
                    <path d="M2.99 11.98a9 9 0 0 0 9 9m9 -9a9 9 0 0 0 -9 -9" />
                    <path d="M8 7h-4" />
                </svg>
            ),
        },
        {
            type: PracticeType.Written,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-a-b-2"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 21h3c.81 0 1.48 -.67 1.48 -1.48l.02 -.02c0 -.82 -.69 -1.5 -1.5 -1.5h-3v3z" />
                    <path d="M16 15h2.5c.84 -.01 1.5 .66 1.5 1.5s-.66 1.5 -1.5 1.5h-2.5v-3z" />
                    <path d="M4 9v-4c0 -1.036 .895 -2 2 -2s2 .964 2 2v4" />
                    <path d="M2.99 11.98a9 9 0 0 0 9 9m9 -9a9 9 0 0 0 -9 -9" />
                    <path d="M8 7h-4" />
                </svg>
            ),
        },
        {
            type: PracticeType.MultiplceChoice,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-a-b-2"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 21h3c.81 0 1.48 -.67 1.48 -1.48l.02 -.02c0 -.82 -.69 -1.5 -1.5 -1.5h-3v3z" />
                    <path d="M16 15h2.5c.84 -.01 1.5 .66 1.5 1.5s-.66 1.5 -1.5 1.5h-2.5v-3z" />
                    <path d="M4 9v-4c0 -1.036 .895 -2 2 -2s2 .964 2 2v4" />
                    <path d="M2.99 11.98a9 9 0 0 0 9 9m9 -9a9 9 0 0 0 -9 -9" />
                    <path d="M8 7h-4" />
                </svg>
            ),
        },
    ];

    const navigate = useNavigate();

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <ul className="mt-6 space-y-3">
                    {practiceOptionsType.map((option, index) => {
                        return (
                            <PracticeOptionsType
                                key={index}
                                onClick={() =>
                                    setOptions({
                                        quizType: option.type,
                                    })
                                }
                                icon={option.icon}
                                practiceType={option.type}
                                isSelected={options.quizType == option.type}
                            />
                        );
                    })}
                </ul>

                {/* <div className="">
                    <select
                        id=""
                        className="grow border-container border-[3px] bg-background rounded-lg w-full h-full p-4 text-foreground"
                    >
                        <option className="" value="1">
                            Term
                        </option>
                        <option value="2">Definition</option>
                    </select>
                </div> */}

                <Button
                    className="ml-auto w-fit px-10"
                    onClick={() =>
                        navigate(
                            `/study-set/${studySetId}/practice/multiple-choice`
                        )
                    }
                >
                    Practice
                </Button>
            </DialogContent>
        </Dialog>
    );
};

interface PracticeOptionTypeProps {
    icon: ReactNode;
    practiceType: PracticeType;
    isSelected: boolean;
    onClick?: () => void;
}

const PracticeOptionsType = ({
    icon,
    practiceType,
    isSelected,
    onClick,
}: PracticeOptionTypeProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex gap-4 py-5 px-5 cursor-pointer 
                border-[3px] rounded-lg ${
                    isSelected
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "border-container hover:bg-container"
                } `}
        >
            {icon}
            <h5>{practiceType.toLocaleString()}</h5>
        </button>
    );
};
