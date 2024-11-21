import styles from './header.module.css';
import { Link } from 'react-router-dom';
function Top() {
    return (
        <div>
            <header>
                <div className={styles.interface}>
                    <div className={styles.texto}>
                        <h1>Receitas++</h1>

                    </div>


                    <div className={styles.botao}>
                        <a href="#suas-receitas">Suas <br></br>receitas</a>
                        <a href="#descubra-receitas">Descubra<br></br> Receitas</a>
                        <a href="#placeholder">Place <br></br>Holder</a>
                        <a href="#sua-conta">Sua <br></br>Conta</a>
                        <div className={styles.user}>
                            <span>👤</span>
                        </div>
                    </div>

                </div>


            </header>
        </div>
    )
}
export default Top;