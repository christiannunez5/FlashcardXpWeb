import { MainLayout } from "@/components/layout";
import { ProgressBar } from "@/components/shared";
import { useAuthContext } from "@/context/auth/hooks";
import { useGetCurrentUserExperience } from "@/features/experience/hooks";
import { getExperiencePercentage } from "@/utils";

export const Profile = () => {
    const { user } = useAuthContext();

    const { data: experience, isPending } = useGetCurrentUserExperience();

    return (
        <MainLayout>
            <section>
                {isPending || !experience ? null : (
                    <div className="w-full bg-primary rounded-xl p-7 flex gap-4 items-center">
                        <div className="h-20 w-20 rounded-full border-2 border-container"></div>

                        <div className="grow space-y-3">
                            <div className="flex justify-between">
                                <h4>
                                    {`${experience?.level.title} : ${experience?.level.value}`}
                                </h4>
                                <p>
                                    {experience?.currentExperience} /{" "}
                                    {experience?.maxXp}
                                </p>
                            </div>

                            <ProgressBar
                                height={3}
                                currentProgress={experience?.currentExperience}
                                maxProgress={experience?.maxXp}
                            />
                        </div>
                    </div>
                )}
            </section>
        </MainLayout>
    );
};
