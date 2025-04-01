import { formatDistanceToNow } from "date-fns";

/**
 *
 * @param timeStamp {string} timestamp - The date time string (e.g., "2025-04-01T10:50:21.1838927Z").
 * @returns {string} - A formatted string representing the last viewed time.
 */

export const formatLastViewedAt = (timeStamp: string) => {
    return formatDistanceToNow(new Date(timeStamp), { addSuffix: true });
};
