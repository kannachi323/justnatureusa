import {
  createBrowserRouter,
} from "react-router";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Gallery from "./pages/Gallery.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import OrchidHandbook from "./pages/OrchidHandbook.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {index: true, element: <Home />},
        {path: "gallery", element: <Gallery />},
        {path: "contact", element: <Contact />},
        {path: "orchid-handbook", element: <OrchidHandbook />},
        {path: "login", element: <Login />},
        {path: "signup", element: <Signup />},
    ]
  },
]);
