import { useMemo } from "react";
import AuthRoutes from "./routes/auth/route";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AppRoutes } from "./routes/app/route";
import { ProtectedRoutes } from "@/lib/protected-routes";
import { Login } from "@/app/routes/auth/login";

const createAppRouter = () => {
    return createBrowserRouter([
        {
            path: "/auth",
            element: <AuthRoutes />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "register",
                    lazy: async () => {
                        const { Register } = await import(
                            "./routes/auth/register"
                        );
                        return {
                            Component: Register,
                        };
                    },
                },
            ],
        },
        {
            path: "/",
            element: (
                <ProtectedRoutes>
                    <AppRoutes />
                </ProtectedRoutes>
            ),
            children: [
                {
                    index: true,
                    lazy: async () => {
                        const { Home } = await import("./routes/app/home");
                        return { Component: Home };
                    },
                },
                {
                    path: "study-set/:id",
                    lazy: async () => {
                        const { StudySet } = await import(
                            "./routes/app/studyset"
                        );
                        return { Component: StudySet };
                    },
                },
                {
                    path: "study-set/combine",
                    lazy: async () => {
                        const { CombineStudySet } = await import(
                            "./routes/app/combine-study-set"
                        );
                        return { Component: CombineStudySet };
                    },
                },
                {
                    path: "my-files",
                    lazy: async () => {
                        const { MyFiles: MyStudySets } = await import(
                            "./routes/app/my-files"
                        );
                        return { Component: MyStudySets };
                    },
                },
                {
                    path: "study-set/:id/edit",
                    lazy: async () => {
                        const { EditStudySet } = await import(
                            "./routes/app/edit-study-set"
                        );
                        return { Component: EditStudySet };
                    },
                },
                {
                    path: "/profile",
                    lazy: async () => {
                        const { Profile } = await import(
                            "./routes/app/profile"
                        );
                        return { Component: Profile };
                    },
                },

                // quiz routes
                {
                    path: "/study-set/:id/quiz",
                    lazy: async () => {
                        const { QuizLayout } = await import(
                            "@/components/layout/quiz-layout"
                        );
                        return { Component: QuizLayout };
                    },
                    children: [
                        {
                            path: "multiple-choice",
                            lazy: async () => {
                                const { MultipleChoice } = await import(
                                    "./routes/app/multiple-choice"
                                );
                                return { Component: MultipleChoice };
                            },
                        },
                        {
                            path: "written",
                            lazy: async () => {
                                const { WrittenQuiz } = await import(
                                    "./routes/app/written-quiz"
                                );
                                return { Component: WrittenQuiz };
                            },
                        },
                    ],
                },
                // quiz routes ends

                // group routes

                {
                    path: "groups/:id",
                    lazy: async () => {
                        const { Group } = await import("./routes/app/group");
                        return { Component: Group };
                    },
                },

                // folder routes
                {
                    path: "folders/:id",
                    lazy: async () => {
                        const { Folder } = await import("./routes/app/folder");
                        return { Component: Folder };
                    },
                },

                // challenge routes
                {
                    path: "/challenge",
                    lazy: async () => {
                        const { Challenge } = await import(
                            "./routes/app/challenge"
                        );
                        return { Component: Challenge };
                    },
                },

                {
                    path: "/challenge/bomb-party",
                    lazy: async () => {
                        const { BombParty } = await import(
                            "./routes/app/challenge/bomb-party"
                        );
                        return { Component: BombParty };
                    },
                },

                // leaderboard routes
                {
                    path: "/leaderboard",
                    lazy: async () => {
                        const { Leaderboard } = await import(
                            "./routes/app/leaderboard"
                        );
                        return { Component: Leaderboard };
                    },
                },

                // explore
                {
                    path: "/explore",
                    lazy: async () => {
                        const { Explore } = await import(
                            "./routes/app/explore"
                        );
                        return { Component: Explore };
                    },
                },

                // explore
                {
                    path: "/explore/tags/:id",
                    lazy: async () => {
                        const { Tag } = await import("./routes/app/tag");
                        return { Component: Tag };
                    },
                },

                {
                    path: "/study-set/ai-upload",
                    lazy: async () => {
                        const { AiUpload } = await import(
                            "./routes/app/ai-upload"
                        );
                        return { Component: AiUpload };
                    },
                },
            ],
        },
    ]);
};

const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
