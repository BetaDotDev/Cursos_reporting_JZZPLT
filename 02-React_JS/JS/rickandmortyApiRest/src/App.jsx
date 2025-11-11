import './App.css'
import { useState, useEffect } from 'react'

function App() {

    useEffect{() => {

    getData()

  }, []}

  // Así hacemos un API Rest


  
  async function getData(){
    try {
    const response = await fetch("https://rickandmortyapi.com/api/character")
    const data = await response.json()
    }
    catch{
      
    }
  }

  

  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default App
