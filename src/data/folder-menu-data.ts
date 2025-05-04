import folder from "@/assets/opened-folder.svg";
import { TCreateMenuType } from "@/types";

export const folderMenuData: TCreateMenuType[] = [
    {
        title: "Organize your study sets into a folder",
        icon: folder,
        type: "modal",
        action: "create-folder",
    },
];
