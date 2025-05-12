import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import {
    createFolderSchema,
    TCreateFolderSchema,
    useRenameFolder,
} from "@/features/folders/hooks";
import { TFolderSummary } from "@/types";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

interface RenameFolderFormProps {
    folder: TFolderSummary;
    onSubmitCallback: () => void;
}

export const RenameFolderForm: React.FC<RenameFolderFormProps> = ({
    folder,
    onSubmitCallback,
}) => {
    const { getValues, register, handleSubmit } = useForm<TCreateFolderSchema>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            name: folder.name,
        },
    });

    const params = useParams();

    const { mutate: renameFolder } = useRenameFolder(params.id);

    const handleRenameFolder = () => {
        const formData = getValues();

        const renameFolderData = {
            folderId: folder.id,
            data: formData,
        };

        renameFolder(renameFolderData);
        onSubmitCallback();
    };

    return (
        <form
            className="mt-3"
            onSubmit={handleSubmit(handleRenameFolder, (errors) => {
                handleZodErrors(errors);
            })}
        >
            <FormInput
                className="border-container border-1 py-2.5 
                px-5 rounded-3xl"
                {...register("name")}
                placeholder="Enter new name..."
            />

            <div className="space-x-3 w-fit ml-auto mt-5">
                <DialogClose>
                    <Button
                        variant={"outline"}
                        type="button"
                        className="px-10 border-2 border-container hover:bg-container"
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button className="px-10 border-2 border-container ">
                    Save
                </Button>
            </div>
        </form>
    );
};
