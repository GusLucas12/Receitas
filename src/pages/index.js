import header from "../components/cabeca";
import styles from './home.module.css';
import React, { useState } from "react";




function Home() {
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
        <div >
            <div className={styles.main}>
                <main >
                    <div className={styles.box}>
                        <h1>Receitas++</h1>
                        <h2>Descubra Receitas inovadoras e acabe com o desperdício</h2>

                    </div>
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
                </main>
            </div>


        </div>

    )
}
export default Home;