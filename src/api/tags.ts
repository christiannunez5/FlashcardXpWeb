import api from "@/lib/axios";
import { TTag } from "@/types";

const ENDPOINT = "api/tags";

export const getTags = async (): Promise<TTag[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 200);
    });
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};
