import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import NavBar from "../components/navBar.jsx";
import CardPage from "../pages/CardPage.jsx";
import UtilisateurPage from "../pages/UtilisateurPage.jsx";


const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <NavBar/>
            <HomePage/>
        </>
    },
    {
        path: "/cards",
        element: <>
            <NavBar/>
            <CardPage/>
        </>
    },
    {
        path: "/users",
        element: <>
            <NavBar/>
            <HomePage/>
        </>
    },
    {
        path: "/user/:id",
        element: <>
            <NavBar/>
            <UtilisateurPage/>
        </>
    }
])

export default AppRouter;
