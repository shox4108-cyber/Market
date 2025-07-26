import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import DetailPage from "../pages/DetailPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/product/:id',
        element: <DetailPage/>,
    }
])