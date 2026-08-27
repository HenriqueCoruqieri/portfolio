import { Route, Routes } from "react-router-dom"

import Layout from "./components/layout/Layout"
import About from "./pages/About"
import Contato from "./pages/Contact"
import Experiencia from "./pages/Experience"
import Home from "./pages/Home"
import Projetos from "./pages/Projects"
import Skills from "./pages/Skills"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/contato" element={<Contato />} />
      </Route>
    </Routes>
  )
}

export default App
