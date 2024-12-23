import styles from './card.module.css';

function Card({ title, onDelete }) {
    return (
        <div>
            <div className={styles.card}>
                <div className={styles.titulo}>
                    <h2>{title || "Place Holder"}</h2>
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