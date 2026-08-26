import { Outlet } from "react-router-dom"

import { useTheme } from "../../hooks/useTheme"
import Footer from "./Footer"
import Navbar from "./Navbar"

function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="bg-bg text-fg flex min-h-screen flex-col">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
