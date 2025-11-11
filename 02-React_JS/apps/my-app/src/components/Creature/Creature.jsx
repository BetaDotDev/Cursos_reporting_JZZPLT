import './Creature.css'

function Creature({ name, image, description }) {

  return (
    <div>
      <h2>{ name }</h2>

      <img
        src={ image }
        alt=""
        className="small-image"
      />

      <p>{ description }</p>
    </div>
  )
}

export default Creature