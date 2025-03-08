import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUser } from "@/hooks/get-current-user";

const Home = () => {
    const { data: user } = useGetCurrentUser();

    console.log(user);

    return <StudySets />;
};

export default Home;
