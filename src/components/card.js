import styles from './card.module.css';
function Card() {
    <div>
        <div className={styles.card}>
            <div className={styles.titulo}>
                <h2> Place Holder</h2>
                <button className={styles.trashButton} title='apagar'>🗑️</button>
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
}

export default Card;