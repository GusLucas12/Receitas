import header from "../components/cabeca";

import styles from './home.module.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 


function Home() {
    const [recipe, setRecipe] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (recipe) {
            navigate(`/busca?query=${encodeURIComponent(recipe)}`); 
        } else {
            alert("Por favor, insira uma receita!");
        }
    };

    return (
        <div>
            <div className={styles.main}>
                <main>
                    <div className={styles.box}>
                        <h1>Receitas++</h1>
                        <h2>Descubra Receitas inovadoras e acabe com o desperdício</h2>
                    </div>
                    <div className={styles.container}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input
                                type="text"
                                placeholder="Digite o nome de uma receita ou ingredientes..."
                                value={recipe}
                                onChange={(e) => setRecipe(e.target.value)}
                                className={styles.input}
                            />
                            <button type="submit" className={styles.button}>
                                🔍
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
