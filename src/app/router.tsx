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
                    path: "my-studysets",
                    lazy: async () => {
                        const { MyStudySets } = await import(
                            "./routes/app/my-studysets"
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
