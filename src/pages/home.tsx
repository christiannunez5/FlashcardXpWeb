import { Navbar, Sidebar } from "@/components/shared";
import { StudySets } from "@/features/studysets/components";

const Home = () => {
    return (
        <div className="bg-[#eff5f8] w-full flex ">
            <Sidebar />

            <main className="w-full flex flex-col gap-10 p-10 ">
                <Navbar />
                
                <section className="w-full">
                    <StudySets />
                </section>
            </main>
        </div>
    );
};

export default Home;
