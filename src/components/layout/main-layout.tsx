import { Sidebar, Navbar } from "@/components/shared";
import React, { ReactNode, useState } from "react";
import "@/styles/progress-bar.css";

import { ChallengeAlertDialog } from "@/features/challenge/components/challenge-alert-dialog";
import { useSocket } from "@/hooks/use-socket";

interface MainLayoutProps {
    children: ReactNode;
    size?: number;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    size = 100,
    children,
}) => {
    const { receive } = useSocket();
    const [openChallengeModal, setOpenChallengeModal] = useState(false);

    return (
        <div className="bg-background w-full flex text-foreground ">
            <Sidebar />

            <ChallengeAlertDialog
                open={openChallengeModal}
                setOpen={setOpenChallengeModal}
            />

            <main className="w-full flex flex-col gap-10 p-10 bg-background ">
                <Navbar />
                <div className="flex-1 mx-auto" style={{ width: `${size}%` }}>
                    {children}
                </div>
            </main>
        </div>
    );
};
