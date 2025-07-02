import { Outlet } from "react-router"

import { NavBar } from "./components/NavBar.tsx";

export default function App() {
  return (
    <>
      <div className="w-screen h-[10vh]">
        <NavBar />
      </div>

      <div className="w-screen h-[90vh]">
        <Outlet />
      </div>
    
    </>
  )
}

