import styles from './busca.module.css';
import React, { useState } from "react";

function Busca() {
    const [recipe, setRecipe] = useState("");
    const [data, setData] = useState(null); // Estado para armazenar os dados da resposta

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recipe) {
            const text = `me de uma receita de ${recipe}, todas as respostas precisam estar relacionadas a receitas, priorizando as brasileiras tradicionais e receitas internacionais amplamente conhecidas. As respostas devem ser apresentadas exclusivamente no formato JSON, com as propriedades: nome (nome da receita), ingredientes (lista detalhada de ingredientes), tempo_de_preparo (tempo estimado de preparo em minutos ou horas), dificuldade_de_preparo (nível de dificuldade: fácil, médio ou difícil) e preparo (passo a passo detalhado para executar a receita). Além disso, as respostas devem ser limitadas a 250 palavras e não podem incluir informações fora do contexto de receitas ou culinária.`;

            try {
                const response = await fetch("https://backend-engsoft.onrender.com/askthequestion", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: text })
                });

                const textResponse = await response.text(); // Lê a resposta como texto
                setData(JSON.parse(textResponse)); // Converte o texto em JSON e armazena no estado
            } catch (error) {
                console.error("Erro:", error);
            }
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
                    {data && (
                        <div className={styles.titulo}>
                            <h1>{data.nome}</h1>
                            <div className={styles.corpo}>
                                <div className={styles.informacoes}>
                                    <h1>Tempo De Preparo: {data.tempo_de_preparo}</h1>
                                    <h1>Dificuldade: {data.dificuldade_de_preparo}</h1>
                                </div>
                                <div className={styles.ingredientesEModo}>
                                    <div className={styles.Ingredientes}>
                                        <h2>Ingredientes:</h2>
                                        <ul>
                                            {data.ingredientes.map((ingrediente, index) => (
                                                <li key={index}>{ingrediente}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.modoDePreparo}>
                                        <h2>Modo de Preparo:</h2>
                                        <ol>
                                            {data.preparo.map((passo, index) => (
                                                <li key={index}>{passo}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Busca;
