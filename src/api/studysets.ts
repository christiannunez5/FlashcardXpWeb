import api from "../lib/axios";
import { StudySet } from "../types/models";

const ENDPOINT = "api/studyset";

export async function getStudySets() {
    const response = await api.get(ENDPOINT);
    return response.data.data as StudySet[];
}
