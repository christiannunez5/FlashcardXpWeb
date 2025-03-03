import React from "react";
import { RiHome5Line } from "react-icons/ri";
import { IoMdBook } from "react-icons/io";

export const Sidebar = () => {
    return (
        <aside className="h-full bg-white w-16 flex flex-col items-center p-4 rounded-3xl justify-center">
            <div className="flex gap-2 items-center ">
                <IoMdBook className="text-xl text-[#049669]" />
            </div>
                
            <ul className="w-full flex flex-col gap-6 items-center justify-center">
                <li className="bg-white p-2 rounded-full">
                    <RiHome5Line className="text-xl text-[#049669]" />
                </li>
            </ul>
        </aside>
    );
};

interface SidebarItemProps {
    Icon: React.ElementType;
    color?: string;
    size?: number;
}

const SidebarItem = ({ Icon, color, size }: SidebarItemProps) => {
    return (
        <li>
            <Icon
                width={size}
                height={size}
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </li>
    );
};
