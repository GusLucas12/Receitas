import styles from './card.module.css';
import { Link } from 'react-router-dom';
function Card({ title,prepareTime,difficulty,recipe, onDelete }) {
    const mapDifficulty = (difficulty) => {
        const difficultyMap = {
            "easy": "Fácil",
            "medium": "Média",
            "hard": "Difícil",
        };
        return difficultyMap[difficulty] || difficulty; 
    };
    return (
       
        <div>
            <div className={styles.card}>
                <div className={styles.titulo}>
                    <Link to={`/editarReceita/${recipe.id}`} className={styles.custom_link}>
                    <h2>{title || "Place Holder"}</h2>
                    </Link>
                    
                    <button className={styles.trashButton} title="Apagar" onClick={onDelete}>
                        🗑️
                    </button>
                </div>
                <div className={styles.text}>
                    <p>
                        <strong>Tempo De Preparo:<span>{prepareTime}</span> </strong>
                    </p>
                    <p>
                        <strong>Dificuldade: <span>{mapDifficulty(difficulty)}</span> </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Card;