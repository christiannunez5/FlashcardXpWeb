import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import {
    createFolderSchema,
    TCreateFolderSchema,
    useCreateFolder,
} from "@/features/folders/hooks";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

interface CreateFolderFormProps {
    onDeleteSuccessCallback: () => void;
}

export const CreateFolderForm: React.FC<CreateFolderFormProps> = ({
    onDeleteSuccessCallback,
}) => {
    const params = useParams();
    const { mutate: createFolder } = useCreateFolder(params.id);

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<TCreateFolderSchema>({
        resolver: zodResolver(createFolderSchema),
    });

    const handleCreateFolder = () => {
        const data = getValues();
        createFolder(
            { data, folderId: params.id },
            {
                onSuccess: onDeleteSuccessCallback,
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit(handleCreateFolder, (errors) => {
                handleZodErrors(errors);
            })}
            className="space-y-4"
        >
            <FormInput
                {...register("name")}
                error={errors.name}
                className="border-2 border-container px-4"
                placeholder="Enter folder name"
            />

            <div className="space-x-3 w-fit ml-auto ">
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
                    Create
                </Button>
            </div>
        </form>
    );
};
