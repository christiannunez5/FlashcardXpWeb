import { MainLayout } from "@/components/layout";
import { FormInput } from "@/components/ui/input";
import { TagList } from "@/features/tags/components";
import { useGetTags } from "@/features/tags/hooks";
import { Search } from "lucide-react";

export const Explore = () => {
    const { data: tags } = useGetTags();

    console.log(tags);

    return (
        <MainLayout>
            <h3>Explore</h3>

            <section className="mt-5">
                <FormInput
                    icon={<Search />}
                    className="rounded-4xl py-2.5 px-4 bg-primary w-96 gap-4"
                    placeholder="Search tags"
                />

                <div className="mt-5">
                    <TagList tags={tags} />
                </div>
            </section>
        </MainLayout>
    );
};
