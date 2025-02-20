import React, { useState, useEffect } from "react";
import useUserInfo from "../components/user";
import styles from "./usuario.module.css";
import Card from "../components/card";
import { Link, useNavigate } from "react-router-dom";
import FeedbackMessage from "../components/feedback";


function Usuario() {
  const { userData, error, loading, getUserInfo } = useUserInfo();
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

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
            <div className={styles.foto}>

            </div>
            <div className={styles.nomeBadge}>
              <h1>{userData ? userData.name : "Place Holder"}</h1>
              <span className={styles.badge}>Membro</span>


            </div>
          </div>
          <Link to='/editar'>
            <button className={styles.editarPerfil} title="Editar Perfil">✏️</button>
            
          </Link>
      
        </div>
   
      </div>

    </div>
  );
}

export default Usuario;
