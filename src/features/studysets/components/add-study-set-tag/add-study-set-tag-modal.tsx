import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddStudySetTagForm } from "./add-study-set-tag-form";

import { TTag } from "@/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { ReactNode, useState } from "react";

interface AddStudySetTagModalProps {
    children: ReactNode;
    tags: TTag[];
}

export const AddStudySetTagModal: React.FC<AddStudySetTagModalProps> = ({
    children,
    tags,
}) => {
    const [input, setInput] = useState("");
    const [filteredTag, setFilteredTag] = useState<TTag[]>(tags);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    <h4>Edit your tags</h4>
                </DialogTitle>

                {/* <div className="bg-primary px-3 rounded-fu">
                    <select className="rounded-full p-3 bg-primary">
                        {tags.map((tag) => {
                            return <option value={tag.id}>{tag.name}</option>;
                        })}
                    </select>
                </div> */}

                <div>
                    <AddStudySetTagForm tags={tags} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
