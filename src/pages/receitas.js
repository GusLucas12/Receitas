import React, { useState } from 'react';
import styles from './receitas.module.css';
import Card from '../components/card.js';
import { Link } from 'react-router-dom';

function Receitas() {
    const [cards, setCards] = useState([]);

    const addCard = () => {
        const newCard = { id: cards.length + 1, title: `Card ${cards.length + 1}` };
        setCards([...cards, newCard]);
    };

    const deleteCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>


                <h1 className={styles.title}>Suas Receitas</h1>
                <div className={styles.cardsRow}>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            onDelete={() => deleteCard(card.id)}
                        />
                    ))}
                    <div className={styles.cardAdd} onClick={addCard}>
                      <Link><h2>+</h2></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Receitas;
