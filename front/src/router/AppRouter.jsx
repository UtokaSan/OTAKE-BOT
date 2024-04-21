import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import NavBar from "../components/navBar.jsx";
import CardPage from "../pages/CardPage.jsx";
import Utilisateur from "../pages/Utilisateur.jsx";


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
            <Utilisateur/>
        </>
    }
])

export default AppRouter;
