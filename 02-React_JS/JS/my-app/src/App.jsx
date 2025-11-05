import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Creature from  './components/Creature/Creature'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)
  // logic presentation
  // .. 

  // render es lo que se va a dibujar
  return (
    <div>
      {/* ----------Así se escriben comentarios de html en jsx----------*/}
      {/*Cada uno de los siguientes componentes se gfuardan en la carpeta components y cada componente en su carpeta especifica*/}
      {/* ---------- HEADER ----------*/}
      <Header />
      {/* ---------- MAIN ----------*/}
      <Main />
      <Creature 
        name="Quimera"
        image="https://www.seresmitologicos.net/wp-content/uploads/2011/05/quimera_volando.jpg"
        description=" Quimera: criatura legendaria híbrida con cabeza de león, cuerpo de cabra y cola de serpiente. Símbolo de peligro y maravilla en la mitología clásica. "
      />
      <Creature 
        name="Medusa"
        image="https://www.shutterstock.com/image-vector/medusa-character-greek-mythology-vector-600w-2564770017.jpg"
        description=" Medusa era una gorgona, una monstruosa figura de la mitología griega, descrita generalmente como una
mujer con serpientes vivas en lugar de cabello "
      />

      {/* ---------- FOOTER ----------*/}
      <Footer />

    </div>
  )
}

export default App
