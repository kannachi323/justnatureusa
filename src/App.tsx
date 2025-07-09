import { Outlet } from "react-router"

import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthProvider";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <header className="h-[10vh]">
        <NavBar />
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
      
    </AuthProvider>
  )
}

