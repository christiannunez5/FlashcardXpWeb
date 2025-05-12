import { TTag } from "@/types";

interface TagCardProps {
    tag: TTag;
}

export const TagCard: React.FC<TagCardProps> = ({ tag }) => {
    return (
        <div className="card rounded-3xl space-y-5">
            <img src={tag.imageUrl} alt="" className="h-12 w-12" />
            <h5>{tag.name}</h5>
        </div>
    );
};
