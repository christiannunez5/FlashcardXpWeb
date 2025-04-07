export enum LevelTitle {
    Herald = 1,
    Guardian = 2,
    Crusader = 3,
    Archon = 4,
    Legend = 5,
    Ancient = 6,
    Divine = 7,
    Immortal = 8,
}

export const convertExperienceToLevel = (xp: number) => {
    let title = LevelTitle.Herald;
    let maxXp = 100;

    if (xp < 250) {
        title = LevelTitle.Guardian;
        maxXp = 250;
    } else if (xp < 450) {
        title = LevelTitle.Crusader;
        maxXp = 450;
    } else if (xp < 700) {
        title = LevelTitle.Archon;
        maxXp = 700;
    } else if (xp < 1000) {
        title = LevelTitle.Legend;
        maxXp = 1000;
    } else if (xp < 1350) {
        title = LevelTitle.Ancient;
        maxXp = 1350;
    } else if (xp < 1750) {
        title = LevelTitle.Divine;
        maxXp = 1750;
    } else if (xp < 2200) {
        title = LevelTitle.Immortal;
        maxXp = 2200;
    }

    return {
        level: title,
        title: LevelTitle[title],
        maxXp,
    };
};
