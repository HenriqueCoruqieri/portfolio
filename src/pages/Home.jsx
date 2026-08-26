import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import About from "../components/sections/About"
import Hero from "../components/sections/Hero"
import Technologies from "../components/sections/Technologies"
import { useTheme } from "../hooks/useTheme"

function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="bg-bg text-fg min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Technologies />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default Home
