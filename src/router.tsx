import {
  createBrowserRouter,
} from "react-router";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Gallery from "./pages/Gallery.tsx";
import Info from "./pages/Info.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import OrchidHandbook from "./pages/OrchidHandbook.tsx";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections.tsx";
import Account from "./pages/Account.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {index: true, element: <Home />},
        {path: "gallery", element: <Gallery />},
        {path: "info", element: <Info />},
        {path: "orchid-handbook", element: <OrchidHandbook />},
        {path: "login", element: <Login />},
        {path: "signup", element: <Signup />},
        {path: "shop", element: <Shop />},
        {path: "collections", element: <ProtectedRoute><Collections/></ProtectedRoute>},
        {path: "account", element: <ProtectedRoute><Account /></ProtectedRoute>},
    ]
  },
]);
