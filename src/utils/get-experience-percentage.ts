export const getPercentage = (xp: number, maxXp: number) => {
    const percentage = (xp / maxXp) * 100;
    return percentage;
};
