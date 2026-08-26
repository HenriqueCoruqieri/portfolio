import { Route, Routes } from "react-router-dom"

import Layout from "./components/layout/Layout"
import Contato from "./pages/Contato"
import Experiencia from "./pages/Experiencia"
import Home from "./pages/Home"
import Projetos from "./pages/Projetos"
import Skills from "./pages/Skills"
import Sobre from "./pages/Sobre"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/contato" element={<Contato />} />
      </Route>
    </Routes>
  )
}

export default App
