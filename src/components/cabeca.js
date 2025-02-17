import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';

function Top() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    
    const updateLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLogged(token && token !== '0');
    };

  
    updateLoginStatus();

   
    const intervalId = setInterval(updateLoginStatus, 1000);

    
    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.setItem('authToken', '0');
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.interface}>
        <div className={styles.texto}>
          <Link to='/' className={styles.custom_link}>
            <h1>Receitas++</h1>
          </Link>
        </div>

        <div className={styles.menuDesktop}>
          <Link to='/busca' className={styles.custom_link}>
            <h1>Descubra<br />Receitas</h1>
          </Link>
          <Link to='/criar' className={styles.custom_link}>
            <h1>Crie<br />Receitas</h1>
          </Link>
          <Link to='/receitas' className={styles.custom_link}>
            <h1>Suas<br />receitas</h1>
          </Link>
          <Link to='/usuario' className={styles.custom_link}>
            <h1>Sua<br />Conta</h1>
          </Link>
          <div className={styles.user}>
            <Link to='/usuario' className={styles.custom_link}>
              <span role="img" aria-label="usuário">👤</span>
            </Link>
          </div>
          {isLogged && (
            <button onClick={handleLogout} className={styles.logout}>
              Sair
            </button>
          )}
        </div>

        {/* Botão hambúrguer para mobile */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Menu lateral (mobile) */}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sideMenuContent}>
          <button className={styles.closeButton} onClick={toggleMenu}>
            X
          </button>
          <Link to='/busca' className={styles.custom_link} onClick={toggleMenu}>
            <h1>Descubra<br />Receitas</h1>
          </Link>
          <Link to='/criar' className={styles.custom_link} onClick={toggleMenu}>
            <h1>Crie<br />Receitas</h1>
          </Link>
          <Link to='/receitas' className={styles.custom_link} onClick={toggleMenu}>
            <h1>Suas<br />receitas</h1>
          </Link>
          <Link to='/usuario' className={styles.custom_link} onClick={toggleMenu}>
            <h1>Sua<br />Conta</h1>
          </Link>
          {isLogged && (
            <button onClick={handleLogout} className={styles.logout}>
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Top;
