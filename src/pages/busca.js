import React, { useState } from "react";
import {marked} from "marked";
import styles from './busca.module.css';

function Busca() {
    const [recipe, setRecipe] = useState("");
    const [markdown, setMarkdown] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recipe) {
            const text = `me de uma receita de ${recipe}, se limite a apenas uma receita por vez , todas as respostas precisam estar relacionadas a receitas, priorizando as brasileiras tradicionais e receitas internacionais amplamente conhecidas. As respostas devem ser apresentadas exclusivamente no formato Markdown. Sempre formate as respostas com nome,tempo de preparo, dificuldade(Facil,Média e Dificil) e ingredientes. Formate o texto para sempre aparecer no centro da tela porem com a formatação mais a esquerda`;

            try {
                const response = await fetch("https://backend-engsoft.onrender.com/askthequestion", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: text })
                });

                const textResponse = await response.text(); 
                setMarkdown(textResponse); 
            } catch (error) {
                console.error("Erro:", error);
            }
            setRecipe(""); 
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
                    {markdown && (
                        <div
                            className={styles.markdown}
                            dangerouslySetInnerHTML={{ __html: marked(markdown) }} 
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Busca;
