import { Outlet } from "react-router"

import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <div className="h-[10vh] max-w-screen max-h-full">
          <NavBar />
      </div>

      <div className="h-[90vh] max-w-screen max-h-full">
        <Outlet />
      </div>
    </AuthProvider> 
  )
}

