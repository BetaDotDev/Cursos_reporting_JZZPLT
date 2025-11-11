import './Creature.css'

function Creature (name,image,description) {
    return (
        <div>
            {/* ---------- Creature ----------*/}
            <h2> { name } </h2>
            
            <img 
                src= { image }
                alt=""
                class="small-image"
            />

            <p> { description }</p>
        </div>
    )
}
export default Creature
