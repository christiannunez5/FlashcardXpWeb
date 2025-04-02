// import { useGetCurrentUser } from "@/hooks/get-current-user";
// import Home from "@/app/routes/app/home";
// import { ThemeContextProvider } from "@/context/theme/provider";
// import { PrivateRoutes } from "@/routes/private-routes";
// import { ProtectedRoutes } from "@/routes/protected-routes";
// import { PublicRoutes } from "@/routes/public-routes";
// import { LogIn } from "lucide-react";
// import path from "path";
// import { Suspense } from "react";
// import {
//     BrowserRouter,
//     createBrowserRouter,
//     createRoutesFromElements,
//     Route,
//     Routes,
// } from "react-router";

// const RootNavigator = () => {

//     return (
//         <ThemeContextProvider>
//             <BrowserRouter>
//                 {/* <Suspense fallback={<p>Loading.....</p>}>
//                     {user !== undefined ? <PrivateRoutes /> : <PublicRoutes />}
//                 </Suspense> */}

//                 <Routes>
//                     {/* <Route element={<LogIn />} path="/login" /> */}

//                     <PublicRoutes />
//                     <Route element={<ProtectedRoutes />}>
//                         <Route element={<Home />} path="/" />
//                     </Route>
//                 </Routes>
//             </BrowserRouter>
//         </ThemeContextProvider>
//     );
// };

// export default RootNavigator;
