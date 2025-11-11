import './App.css'

function App() {

  // Así hacemos un API Rest
  async function getData(){
    const response = await fetch("https://rickandmortyapi.com/api/character")
    const data = await response.json()

  }

  

  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default App
