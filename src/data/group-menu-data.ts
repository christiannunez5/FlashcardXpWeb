import groupIcon from "@/assets/group.png";
import { TCreateMenuType } from "@/types";

export const groupMenuData: TCreateMenuType[] = [
    {
        title: "Create a group to study with others",
        icon: groupIcon,
        type: "modal",
        action: "create-group",
    },
];
