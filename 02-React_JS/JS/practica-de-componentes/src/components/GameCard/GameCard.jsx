import './GameCard.css'

function GameCard({ name, image, href, description }) {
  return (
    <div className="game-card">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={name} className="game-image" />
        <h3 className="game-title">{name}</h3>
        {description && <p className="game-description">{description}</p>}
      </a>
    </div>
  );
}

export default GameCard;
