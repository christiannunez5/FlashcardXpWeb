import { TTag } from "@/types";
import { useNavigate } from "react-router";

interface TagCardProps {
    tag: TTag;
}

export const TagCard: React.FC<TagCardProps> = ({ tag }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card rounded-3xl space-y-5"
            onClick={() => navigate(`/explore/tags/${tag.id}`)}
        >
            <img src={tag.imageUrl} alt="" className="h-12 w-12" />
            <h5>{tag.name}</h5>
        </div>
    );
};
