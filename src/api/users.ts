import api from "@/lib/axios";
import { TTopStudySetCreator, TUser } from "@/types";

const ENDPOINT = "api/users";

export const getFollowers = async (): Promise<TUser[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}/followers`);
    return response.data;
};

export const getFollowings = async (): Promise<TUser[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}/followings`);
    return response.data;
};

export const followUser = async (userToFollowId: string): Promise<TUser> => {
    const response = await api.post(`${ENDPOINT}/${userToFollowId}/follow`);
    return response.data;
};

export const isUserFollowed = async (
    userFollowingId: string
): Promise<boolean> => {
    const response = await api.get(
        `${ENDPOINT}/${userFollowingId}/is-followed`
    );
    return response.data;
};

export const getTopStudySetCreator = async (): Promise<
    TTopStudySetCreator[]
> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 150);
    });
    const response = await api.get(`${ENDPOINT}/top-creators`);
    return response.data;
};
