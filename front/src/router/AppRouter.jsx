import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";


const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    }
    ])

export default AppRouter;
