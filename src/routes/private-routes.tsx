import { MainLayout } from "@/components/layout";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/pages/home"));
const StudySet = lazy(() => import("@/pages/studyset"));
const MyStudySets = lazy(() => import("@/pages/my-studysets"));
const Leaderboard = lazy(() => import("@/pages/leaderboard"));
const EditStudySet = lazy(() => import("@/pages/edit-study-set"));
const MatchingQuiz = lazy(() => import("@/pages/matching-quiz"));
const MultiplceChoiceQuiz = lazy(() => import("@/pages/multiple-choice"));
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
            <Route
                path="study-set/:id/practice/match"
                element={<MatchingQuiz />}
            />

            <Route
                path="study-set/:id/practice/multiple-choice"
                element={<MultiplceChoiceQuiz />}
            />
        </Routes>
    );
};
