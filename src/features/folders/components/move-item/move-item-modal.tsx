import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

export const MoveItemModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>Open modal</DialogTrigger>

            <DialogContent>
                <h3>Move this item</h3>

                <h5>Folders</h5>

                <div></div>
            </DialogContent>
        </Dialog>
    );
};
