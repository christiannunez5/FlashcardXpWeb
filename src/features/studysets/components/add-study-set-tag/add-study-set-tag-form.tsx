import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useAddStudySetTag } from "@/features/studysets/hooks/add-study-set-tag";
import { TTag } from "@/types";
import { ChevronDown } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";

interface AddStudySetTagFormProps {
    tags: TTag[];
}

export const AddStudySetTagForm: React.FC<AddStudySetTagFormProps> = ({
    tags,
}) => {
    const params = useParams();

    if (!params.id) {
        throw new Error("Params cannot be null");
    }
    const { mutate: addTag } = useAddStudySetTag(params.id);

    const [filteredTags, setFilteredTags] = useState<TTag[]>(tags);
    const [selectedTag, setSelectedTag] = useState<TTag>({
        id: "",
        imageUrl: "",
        name: ""
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    useEffect(() => {
        if (selectedTag.name === "") {
            setFilteredTags(tags);
        } else {
            const filtered = tags.filter((tag) =>
                tag.name.toLowerCase().includes(selectedTag.name.toLowerCase())
            );
            setFilteredTags(filtered);
        }
    }, [selectedTag, tags]);

    const handleTagSelect = (tag: TTag) => {
        setIsDropdownOpen(!isDropdownOpen);
        setSelectedTag(tag);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedTag.name === "") {
            return;
        }

        addTag({ studySetId: params.id!, tag: selectedTag });
    };

    const handleInputFocus = () => {
        setIsDropdownOpen(true);
    };

    return (
        <form className="relative" onSubmit={handleSubmit}>
            <div
                className="border-2 border-container rounded-full flex 
                        py-2 px-5 items-center"
            >
                <input
                    className="outline-none grow"
                    placeholder="Type a tag"
                    value={selectedTag.name}
                    onFocus={handleInputFocus}
                    onChange={(e) => {
                        setSelectedTag((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }));
                    }}
                />
                <ChevronDown size={18} />
            </div>

            {/* <ul
                className="absolute z-10 bg-background border mt-2 rounded-md shadow-lg w-full
                    max-h-60 overflow-y-auto"
            >
                {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                        <li
                            key={tag.id}
                            className="p-2 hover:bg-muted cursor-pointer"
                            onClick={() => handleTagSelect(tag)}
                        >
                            {tag.name}
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-muted-foreground">
                        No matches found
                    </li>
                )}
            </ul> */}
            {isDropdownOpen && (
                <ul
                    className="absolute z-10 bg-background border mt-2 rounded-md shadow-lg w-full
                    max-h-52 overflow-y-auto"
                >
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag) => (
                            <li
                                key={tag.id}
                                className="p-2 hover:bg-muted cursor-pointer"
                                onClick={() => handleTagSelect(tag)}
                            >
                                {tag.name}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-muted-foreground">
                            No matches found
                        </li>
                    )}
                </ul>
            )}

            <DialogClose>
                <div className="flex justify-end ">
                    <Button className="mt-5 px-10">Add</Button>
                </div>
            </DialogClose>
        </form>
    );
};
