import { MainLayout } from "@/components/layout";
import { UserExperienceCard } from "@/features/experience/components";
import { useGetCurrentUserExperience } from "@/features/experience/hooks";

export const Profile = () => {
    const { data: userExperience } = useGetCurrentUserExperience();

    return (
        <MainLayout>
            <div className="w-[70%] mx-auto">
                <section>
                    <UserExperienceCard userExperience={userExperience} />
                </section>

                {/* <section>
                <div className="w-full p-4 bg-primary mt-5 rounded-lg">
                    <h5>Friends</h5>
                </div>
            </section>  */}

                <section>
                    <div className="bg-primary p-4 rounded-lg">
                        <div className="flex">
                            <h5>Following</h5>
                            <h5>Followers</h5>
                        </div>
                        <div>
                            <p>Some title</p>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};
