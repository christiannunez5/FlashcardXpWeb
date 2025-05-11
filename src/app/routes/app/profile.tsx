import { MainLayout } from "@/components/layout";

import { UserExperienceCard } from "@/features/experience/components";
import { useGetCurrentUserExperience } from "@/features/experience/hooks";

import { UserProfileCard } from "@/features/user/components";

export const Profile = () => {
    const { data: userExperience } = useGetCurrentUserExperience();

    return (
        <MainLayout size={60}>
            <section className="space-y-4">
                <UserProfileCard />
                <UserExperienceCard userExperience={userExperience} />
            </section>
        </MainLayout>
    );
};
