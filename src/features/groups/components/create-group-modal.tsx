import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import {
    createGroupSchema,
    TCreateGroupSchema,
    useCreateGroup,
} from "@/features/groups/hooks";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";
import { useForm } from "react-hook-form";

interface CreateGroupModalProps {
    children: ReactNode;
    open: boolean;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
    children,
    open,
}) => {
    const { mutate: createGroup } = useCreateGroup();
    
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<TCreateGroupSchema>({
        resolver: zodResolver(createGroupSchema),
    });

    const handleCreateGroup = () => {
        const data = getValues();
        createGroup(data);
    };

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogTitle className="flex flex-col items-center gap-4">
                    <Boxes size={50} className="text-accent" />
                    <h4 className="text-center">Create your new group</h4>
                </DialogTitle>

                <form
                    className="space-y-5 mt-4"
                    onSubmit={handleSubmit(handleCreateGroup, (errors) => {
                        handleZodErrors(errors);
                    })}
                >
                    <FormInput
                        placeholder="Your new group name"
                        error={errors.name}
                        className="w-full py-3 px-4 border-2 border-container
                                    rounded-lg outline-accent"
                        {...register("name")}
                    />

                    <div className="ml-auto flex justify-end">
                        <Button>Create group</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
