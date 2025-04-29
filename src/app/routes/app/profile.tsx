import { MainLayout } from "@/components/layout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth/hooks";
import { UserExperienceCard } from "@/features/experience/components";
import { useGetCurrentUserExperience } from "@/features/experience/hooks";

export const Profile = () => {
    const { data: userExperience } = useGetCurrentUserExperience();
    const { user } = useAuthContext();
    return (
        <MainLayout>
            <div className="w-[70%] mx-auto">
                <section>
                    {/* <div
                            className="bg-primary rounded-xl p-7 flex gap-7 w-full
                        items-center"
                        >
                            <Avatar className="h-28 w-28 bg-accent">
                                <AvatarImage src={user?.profilePicUrl} />
                            </Avatar>
                            <div className="flex gap-4">
                                <h5>30 followers</h5>
                                <h5>25 following</h5>
                            </div>
                        </div> */}
                    <UserExperienceCard userExperience={userExperience} />

                    <div>
                        
                    </div>
                </section>

                {/* <section>
                <div className="w-full p-4 bg-primary mt-5 rounded-lg">
                    <h5>Friends</h5>
                </div>
            </section>  */}
            </div>
        </MainLayout>
    );
};
