import { Outlet } from "react-router"

import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthProvider";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <NavBar />
        </header>

        <main className="flex-grow">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </AuthProvider>
  )
}

