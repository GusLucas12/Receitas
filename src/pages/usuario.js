import React, { useState } from 'react';
import { useUser } from '../components/user';
import styles from './usuario.module.css';
import Card from '../components/card';
import { Link } from 'react-router-dom';

function Usuario() {
  const { user } = useUser();
  const [cards, setCards] = useState([]);

  const addCard = () => {
    const newCard = { id: cards.length + 1, title: `Card ${cards.length + 1}` };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.perfilContainer}>
          <div className={styles.perfilDetails}>
            <div className={styles.fotoNome}>
              <div className={styles.foto}></div>
              <div className={styles.nomeBadge}>
                <h1>{user ? user.name : "Place Holder"}</h1>
                <span className={styles.badge}>Membro</span>
                <p>{user ? user.email : ""}</p>
              </div>
            </div>
            <button className={styles.editarPerfil}>✏️</button>
          </div>
          <div className={styles.descricao}>
            <h3>Sobre mim:</h3>
            <p>{user && user.descricao ? user.descricao : "Gosto de Cozinhar bolos e massas"}</p>
          </div>
          <h1>Receitas Favoritas: </h1>
        </div>
        <div className={styles.receitasContainer}>
          <div className={styles.scroll}>
            {cards.map((card) => (
              <Card key={card.id} title={card.title} onDelete={() => deleteCard(card.id)} />
            ))}
            <div className={styles.cardAdd} onClick={addCard}>
              <Link>
                <h2>+</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
