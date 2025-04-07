export const getExperiencePercentage = (xp: number, maxXp: number) => {
    const percentage = (xp / maxXp) * 100;
    return percentage;
};
