

import './App.css'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import GameRow from './components/GameRow/GameRow'

import { batmanGames } from "./data/batmanGames";
import { valveGames } from "./data/valveGames";
import { cdprGames } from "./data/cdprGames";

/*
import { useState } from 'react'

const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
*/
function App() {
  //const 

  return (
    <div>
      <Header />
      <Main>
        <GameRow title="Juegos de Rocksteady" games={batmanGames} />
        <GameRow title="Juegos de Valve" games={valveGames} />
        <GameRow title="Juegos de CD Projekt Red" games={cdprGames} />
      </Main>
      <Footer />
    </div>
  );
}

export default App;