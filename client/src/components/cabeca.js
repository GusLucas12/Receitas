import styles from './header.module.css';
import { Link } from 'react-router-dom';
function Top() {
    return (
        <div>
            <header>
                <div className={styles.interface}>
                    <div className={styles.texto}>
                        <Link to='/'> <h1>Receitas++</h1></Link>
                       

                    </div>


                    <div className={styles.botao}>
                        <a href="#suas-receitas">Suas <br></br>receitas</a>
                        <Link to='/busca'><h1>Descubra<br></br> Receitas</h1></Link>
                        
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