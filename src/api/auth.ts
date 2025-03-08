import api from "@/lib/axios";

const ENDPOINT = "/api/auth";

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const response = await api.post(`${ENDPOINT}/login`, { email, password });
    return response.data;
}
