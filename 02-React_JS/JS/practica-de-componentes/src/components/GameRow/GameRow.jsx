// src/components/GameRow/GameRow.jsx
import './GameRow.css'
import GameCard from '../GameCard/GameCard';

function GameRow({ title, games }) {
  return (
    <section className="game-row">
      <h2 className="game-row__title">{title}</h2>

      <div className="game-row__cards">
        {games && games.length > 0 ? (
          games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              image={game.image}
              href={game.href}
              description={game.description}
            />
          ))
        ) : (
          <p className="no-games">No hay juegos disponibles.</p>
        )}
      </div>
    </section>
  )
}

export default GameRow
