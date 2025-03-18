import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

/**
 * Displays Zod validation errors as toast notifications.
 * @param errors - React Hook Form field errors
 */

export const handleZodErrors = (errors: FieldErrors) => {
    Object.entries(errors)
        .reverse()
        .forEach(([key, error]: [string | string[], any]) => {
            if (error.message) {
                toast.error(error.message);
            } else if (key === "flashcards") {
                handleZodErrors(error);
            }
        });
};
