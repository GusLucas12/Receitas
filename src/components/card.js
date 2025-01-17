import styles from './card.module.css';
import { Link } from 'react-router-dom';
function Card({ title, onDelete }) {
    return (
        <div>
            <div className={styles.card}>
                <div className={styles.titulo}>
                    <Link to='/editarReceita' className={styles.custom_link}>
                    <h2>{title || "Place Holder"}</h2>
                    </Link>
                  
                    <button className={styles.trashButton} title="Apagar" onClick={onDelete}>
                        🗑️
                    </button>
                </div>
                <div className={styles.text}>
                    <p>
                        <strong>Tempo de Preparo:</strong>
                    </p>
                    <p>
                        <strong>Dificuldade:</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Card;