import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import {
    Dialog,
    DialogClose,
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
import { Boxes, X } from "lucide-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

interface CreateGroupModalProps {
    children?: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
    children,
    open,
    setOpen,
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
        createGroup(data, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent hideCloseButton>
                <DialogClose
                    onClick={() => setOpen(false)}
                    className="w-fit ml-auto "
                >
                    <CircularButton
                        size={10}
                        className="bg-destructive text-accent-foreground"
                    >
                        <X />
                    </CircularButton>
                </DialogClose>

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
