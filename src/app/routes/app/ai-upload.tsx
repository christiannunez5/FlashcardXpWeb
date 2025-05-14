import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useCreateStudySetFromFile } from "@/features/studysets/hooks";
import api from "@/lib/axios";
import { FileText } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

export const AiUpload = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate: addStudySetFromFile, isPending } =
        useCreateStudySetFromFile();

    const handleButtonClick = () => [fileInputRef.current?.click()];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file);
        }
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            // try {
            //     const response = await api.post(
            //         "api/study-sets/ai-upload",
            //         formData,
            //         {
            //             headers: {
            //                 "Content-Type": "multipart/form-data",
            //             },
            //         }
            //     );

            //     console.log("Upload successful:", response.data);
            // } catch (error) {
            //     console.error("Upload failed:", error);
            // }

            addStudySetFromFile(formData, {
                onSuccess: (data) => {
                    window.location.href = `/study-set/${data}`;
                },
            });
        } else {
            console.error("No file selected");
        }
    };

    const renderContent = () => {
        if (isPending) {
            return (
                <div>
                    <h5>Genareting..</h5>
                </div>
            );
        }

        if (selectedFile) {
            return (
                <div className="space-y-3">
                    <div
                        className="flex gap-4 p-4 border-2 border-container
                            rounded-xl items-center"
                    >
                        <div className="p-4 bg-accent rounded-xl">
                            <FileText />
                        </div>

                        <p>{selectedFile.name}</p>
                    </div>

                    <div className="space-x-1">
                        <Button
                            variant={"outline"}
                            className="bg-primary px-10 py-5 rounded-full"
                            type="button"
                            onClick={() => setSelectedFile(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="px-10 py-5 rounded-full"
                            onClick={handleSubmit}
                        >
                            Generate
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h3>Drag and drop PDF file to upload</h3>

                <Button
                    className="rounded-full py-5 px-10"
                    onClick={handleButtonClick}
                >
                    Upload file
                </Button>

                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
        );
    };
    return (
        <MainLayout size={70}>
            <div
                className="w-full h-full bg-primary rounded-4xl flex flex-col
            justify-center items-center shadow-md"
            >
                <div>
                    {/* {selectedFile ? (
                        <div className="space-y-3">
                            <div
                                className="flex gap-4 p-4 border-2 border-container
                            rounded-xl items-center"
                            >
                                <div className="p-4 bg-accent rounded-xl">
                                    <FileText />
                                </div>

                                <p>{selectedFile.name}</p>
                            </div>

                            <div className="space-x-1">
                                <Button
                                    variant={"outline"}
                                    className="bg-primary px-10 py-5 rounded-full"
                                    type="button"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="px-10 py-5 rounded-full"
                                    onClick={handleSubmit}
                                >
                                    Generate
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h3>Drag and drop PDF file to upload</h3>

                            <Button
                                className="rounded-full py-5 px-10"
                                onClick={handleButtonClick}
                            >
                                Upload file
                            </Button>

                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    )} */}

                    {renderContent()}
                </div>
            </div>
        </MainLayout>
    );
};
