import { Skeleton } from "@/components/shared/skeleton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TFolderSummary } from "@/types";
import React from "react";

interface FolderBreadCrumbProps {
    folders: TFolderSummary[] | undefined;
}

export const FolderBreadCrumb: React.FC<FolderBreadCrumbProps> = ({
    folders,
}) => {
    if (!folders) {
        return (
            <div>
                <Skeleton className="h-2 w-28" />
            </div>
        );
    }

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-lg">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/my-files">Files</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                {folders.map((folder, index) => {
                    return (
                        <>
                            <BreadcrumbItem>
                                {index !== folders.length - 1 ? (
                                    <>
                                        <BreadcrumbLink
                                            href={`/folders/${folder.id}`}
                                        >
                                            {folder.name}
                                        </BreadcrumbLink>
                                        <BreadcrumbSeparator />
                                    </>
                                ) : (
                                    <p className="text-foreground">
                                        {folder.name}
                                    </p>
                                )}
                            </BreadcrumbItem>
                        </>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
