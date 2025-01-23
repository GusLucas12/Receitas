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
                        <Link to='/receitas' className={styles.custom_link}><h1>Suas <br></br>receitas</h1></Link> 
                        <Link to='/busca' className={styles.custom_link}><h1>Descubra<br></br> Receitas</h1></Link>
                        <Link to='/criar' className={styles.custom_link}><h1>Crie<br></br>Receitas</h1></Link>
                        
                        <Link to='/usuario' className={styles.custom_link}> <h1>Sua <br></br>Conta</h1> </Link> 
                        <div className={styles.user}> 
                          <Link to='/usuario' className={styles.custom_link}> <span>👤</span> </Link> 
                        </div>
                    </div>

                </div>


            </header>
        </div>
    )
}
export default Top;