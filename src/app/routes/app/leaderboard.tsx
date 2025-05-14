import { MainLayout } from "@/components/layout";
import { TopCreatorList } from "@/features/leaderboard/components";
import { TopXpEarnersList } from "@/features/leaderboard/components/top-xp-earners";
import {
    useGetTopStudySetCreator,
    useGetTopXpEarners,
} from "@/features/user/hooks";
import { useState } from "react";

type LeaderboardCategoryType = {
    label: string;
    key: "creators" | "xp-earners";
};

export const Leaderboard = () => {
    const { data: topCreators } = useGetTopStudySetCreator();
    const { data: topXpEarners } = useGetTopXpEarners();

    const [selectedCategory, setSelectedCategory] = useState<
        "creators" | "xp-earners"
    >("creators");

    const categories: LeaderboardCategoryType[] = [
        { label: "Top creators", key: "creators" },
        { label: "Top XP earners", key: "xp-earners" },
    ];

    return (
        <MainLayout size={70}>
            <div className="flex gap-8 justify-center">
                {categories.map((item) => {
                    return (
                        <div
                            className={`border-accent py-1 hover:text-container
                            cursor-pointer px-4 ${
                                item.key === selectedCategory && "border-b-2"
                            } `}
                            onClick={() => setSelectedCategory(item.key)}
                        >
                            <h3 className="text-center">{item.label}</h3>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5">
                {selectedCategory === "creators" ? (
                    <TopCreatorList topCreators={topCreators} />
                ) : (
                    <TopXpEarnersList topEarners={topXpEarners} />
                )}
            </div>
        </MainLayout>
    );
};
