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

    const [input, setInput] = useState("");
    const [filteredTags, setFilteredTags] = useState<TTag[]>(tags);
    const [selectedTag, setSelectedTag] = useState<TTag>(tags[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const filtered = tags.filter((tag) =>
            tag.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredTags(filtered);
    }, [input, tags]);

    const handleTagSelect = (tag: TTag) => {
        setInput(tag.name);
        setSelectedTag(tag);
        setIsDropdownOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        setIsDropdownOpen(value.length > 0);
    };

    const handleInputFocus = () => {
        if (input.length > 0) {
            setIsDropdownOpen(true);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input === "") {
            alert("fuck u");
            return;
        }

        addTag({ studySetId: params.id!, tag: selectedTag });
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
                    value={input}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <ChevronDown size={18} />
            </div>

            {isDropdownOpen && input && (
                <ul
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
