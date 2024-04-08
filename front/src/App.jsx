import './styles/App.css'
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

function App() {

    return <RouterProvider router={AppRouter}/>
}

export default App;
