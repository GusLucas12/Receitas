import styles from './usuario.module.css'
function Usuario() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.perfilDetails}>
                    <div className={styles.fotoNome}>
                        <div className={styles.foto}></div>
                        <div className={styles.nomeBadge}>
                            <h1>Place Holder</h1>
                            <span className={styles.badge}>Membro</span>
                        </div>
                        
                    </div>
                    <button className={styles.editarPerfil}>✏️</button>
                </div>
            </div>
        </div>
    )
}
export default Usuario;