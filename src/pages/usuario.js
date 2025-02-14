import React, { useState, useEffect } from "react";
import useUserInfo from "../components/user";
import styles from "./usuario.module.css";
import Card from "../components/card";
import { Link } from "react-router-dom";
import FeedbackMessage from "../components/feedback";

function Usuario() {
  const { userData, error, loading, getUserInfo } = useUserInfo();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const addCard = () => {
    const newCard = { id: cards.length + 1, title: `Card ${cards.length + 1}` };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // Se estiver carregando ou se ocorrer um erro, exibe o FeedbackMessage e não renderiza o restante da página.
  if (loading || error) {
    return (
      <FeedbackMessage 
         messages={error ? [error] : []} 
         type={error ? "error" : ""} 
         loading={loading} 
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.perfilContainer}>
        <div className={styles.perfilDetails}>
          <div className={styles.fotoNome}>
            <div className={styles.foto}></div>
            <div className={styles.nomeBadge}>
              <h1>{userData ? userData.name : "Place Holder"}</h1>
              <span className={styles.badge}>Membro</span>
              
            </div>
          </div>
          <button className={styles.editarPerfil}>✏️</button>
        </div>
        <h1>Receitas Favoritas:</h1>
      </div>
      <div className={styles.receitasContainer}>
        <div className={styles.scroll}>
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              onDelete={() => deleteCard(card.id)}
            />
          ))}
          <div className={styles.cardAdd} onClick={addCard}>
            <Link>
              <h2>+</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
