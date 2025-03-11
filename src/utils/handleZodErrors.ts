import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

/**
 * Displays Zod validation errors as toast notifications.
 * @param errors - React Hook Form field errors
 */

export const handleZodErrors = (errors: FieldErrors) => {
    console.log(errors);
    Object.values(errors)
        .reverse()
        .forEach((error: any) => {
            return toast.error(error.message);
        });
};
