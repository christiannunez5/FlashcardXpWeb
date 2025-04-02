import { MainLayout } from "@/components/layout";
import { QuizLayout } from "@/components/layout/quiz-layout";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/app/routes/app/home"));
const StudySet = lazy(() => import("@/app/routes/app/studyset"));
const MyStudySets = lazy(() => import("@/app/routes/app/my-studysets"));
const Leaderboard = lazy(() => import("@/app/routes/app/leaderboard"));
const EditStudySet = lazy(() => import("@/app/routes/app/edit-study-set"));
const MultiplceChoiceQuiz = lazy(() => import("@/app/routes/app/multiple-choice"));
const WrittenQuiz = lazy(() => import("@/app/routes/app/written-quiz"));

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="study-set/:id" element={<StudySet />} />
                <Route path="my-studysets" element={<MyStudySets />} />
                <Route path="study-set/:id/edit" element={<EditStudySet />} />
            </Route>
            <Route path="leaderboard" element={<Leaderboard />} />
            /* QUIZ ROUTES */
            <Route element={<QuizLayout />} path="study-set/:id/quiz">
                <Route
                    path="multiple-choice"
                    element={<MultiplceChoiceQuiz />}
                />
                <Route path="written" element={<WrittenQuiz />} />
            </Route>
        </Routes>
    );
};
