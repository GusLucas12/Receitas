import styles from './busca.module.css';
import React, { useState } from "react";

function Busca() {
    const [recipe, setRecipe] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página
        if (recipe) {
            alert(`Receita escolhida: ${recipe}`);
            setRecipe(""); // Limpa o campo após o envio
        } else {
            alert("Por favor, insira uma receita!");
        }
    };
    return (
        <div>
            <div className={styles.main}>
                <div className={styles.container}>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Digite o nome da receita..."
                            value={recipe}
                            onChange={(e) => setRecipe(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>
                            🔍
                        </button>
                    </form>
                </div>
                <div className={styles.telaDeBusca}>
                    Oi
                </div>
            </div>

        </div>

    )
}
export default Busca;