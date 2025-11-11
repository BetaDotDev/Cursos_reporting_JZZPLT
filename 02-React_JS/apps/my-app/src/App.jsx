// imports
import './App.css'
import Header from './components/Header/Header'
import Creature from './components/Creature/Creature'
import Footer from './components/Footer/Footer'

function App() {
  // logic presentation
  // ...

  // render
  return (
    <div>
      {/* ---------- HEADER ---------- */}
      <Header />

      {/* ---------- MAIN ---------- */}
      <Creature
        name="Quimera"
        image="https://linguisimo.com/wp-content/uploads/Proyecto-nuevo-2023-12-23T121419-093.webp"
        description="La quimera es un monstruo de tres cabezas: cabra, león y dragón"
      />
      <Creature
        name="Medusa"
        image="https://historyhogs.com/wp-content/uploads/2023/04/Medusa-.jpg"
        description="La medusa es una mujer con serpientes en la cabeza"
      />
      {/* <Creature /> */}

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </div>
  )
}

// exports
export default App
