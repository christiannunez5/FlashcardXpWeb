import api from "../lib/axios";
import { StudySet } from "../types";

const ENDPOINT = "/api/studyset";

export async function getStudySets() {
    const response = await api.get<StudySet[]>(ENDPOINT);
    return response.data;
}
