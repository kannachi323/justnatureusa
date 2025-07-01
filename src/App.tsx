import { Outlet } from "react-router"

import { NavBar } from "./components/NavBar.tsx";

export default function App() {
  return (
    <>
      <div className="w-screen h-[15vh]">
        <NavBar />
      </div>

      <div className="w-screen h-[85vh]">
        <Outlet />
      </div>
    
    </>
  )
}

