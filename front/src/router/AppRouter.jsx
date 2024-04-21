import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import NavBar from "../components/navBar.jsx";
import CardPage from "../pages/CardPage.jsx";


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
    }
])

export default AppRouter;
