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
                    <div className={styles.titulo}>
                        <h1>Titulo da Receita</h1>
                    </div>
                    <div className={styles.corpo}>
                        <div className={styles.informacoes}>
                            <h1>Tempo De Preparo: </h1>

                            <h1>Dificuldade: </h1>
                        </div>
                        <div className={styles.ingredientesEModo}>
                            <div className={styles.Ingredientes}>
                                <h2>Ingredientes:</h2>
                                <ul>
                                    <li>2 Ovos</li>
                                    <li>1 Colher de Manteiga</li>
                                    <li>1 Colher de Farinha</li>
                                    <li>1 Colher de Achocolatado</li>
                                </ul>
                            </div>
                            <div className={styles.modoDePreparo}>
                                <h2>Modo de Preparo:</h2>
                                <ol>
                                    <li>Quebre o ovo</li>
                                    <li>Misture o ovo</li>
                                    <li>Misture a farinha</li>
                                    <li>Misture o achocolatado</li>
                                </ol>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}
export default Busca;