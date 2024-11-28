import styles from './header.module.css';
import { Link } from 'react-router-dom';
function Top() {
    return (
        <div>
            <header>
                <div className={styles.interface}>
                    <div className={styles.texto}>
                        <Link to='/' className={styles.custom_link}> <h1>Receitas++</h1></Link>


                    </div>


                    <div className={styles.botao}>
                        <h1>Suas <br></br>receitas</h1>
                        <Link to='/busca' className={styles.custom_link}><h1>Descubra<br></br> Receitas</h1></Link>

                        <h1>Place <br></br>Holder</h1>
                        <h1>Sua <br></br>Conta</h1>
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