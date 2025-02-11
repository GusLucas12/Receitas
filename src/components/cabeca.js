import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Top() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
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
          <button className={styles.closeButton} onClick={toggleMenu}>X</button>
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
        </div>
      </div>
    </header>
  );
}

export default Top;
