import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './busca.module.css';

function Busca() {
    const [searchParams] = useSearchParams();
    const initialRecipe = searchParams.get("query") || "";
    const [recipeQuery, setRecipeQuery] = useState(initialRecipe);
    const [recipeData, setRecipeData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (initialRecipe) {
            fetchRecipe(initialRecipe);
        }
    }, [initialRecipe]);

    const fetchRecipe = async (query) => {
        const text = `me de uma receita de ${query}, se limite a apenas uma receita por vez , 
        todas as respostas precisam estar relacionadas a receitas, priorizando as brasileiras 
        tradicionais e receitas internacionais amplamente conhecidas. As respostas devem ser apresentadas
        exclusivamente no formato JSON. Sempre formate as respostas com nome, tempo_de_preparo, 
        dificuldade (Fácil, Média e Difícil), ingredientes(ingrediente , quantidade), e passos. `;

        try {
            const response = await fetch("https://backend-engsoft.onrender.com/askthequestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text })
            });

            let rawText = await response.text();


            rawText = rawText.replace(/```json|```/g, "").trim();

            const jsonResponse = JSON.parse(rawText);
            setRecipeData(jsonResponse);
        } catch (error) {
            console.error("Erro ao buscar a receita:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (recipeQuery) {
            fetchRecipe(recipeQuery);
        } else {
            alert("Por favor, insira uma receita!");
        }
    };

    const handleAddToFavorites = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <div className={styles.main}>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Digite o nome da receita..."
                            value={recipeQuery}
                            onChange={(e) => setRecipeQuery(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>
                            🔍
                        </button>
                    </form>
                </div>

                <div className={styles.telaDeBusca}>
                    {recipeData && (
                        <>
                            <button
                                onClick={handleAddToFavorites}
                                className={styles.favoriteButton}
                            >
                                ⭐
                            </button>

                            <div className={styles.recipeDetails}>
                                <h1>{recipeData.nome}</h1>
                                <div className={styles.recipeContext}>
                                    <p><strong>Tempo de preparo:</strong> <span>{recipeData.tempo_de_preparo}</span> </p>
                                    <p><strong>Dificuldade:</strong> <span> {recipeData.dificuldade} </span></p>
                                </div>

                                <div className={styles.ingredientes}>
                                    <h3>Ingredientes:</h3>
                                    <ul>
                                        {recipeData.ingredientes.map((item, index) => (
                                            <li key={index}>
                                                {item.ingrediente} - {item.quantidade}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.passos}>
                                    <h3>Passos:</h3>
                                    <ol>
                                        {recipeData.passos.map((passo, index) => (
                                            <li key={index}>{passo}</li>
                                        ))}
                                    </ol>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeButton} onClick={closePopup}>✖</button>
                        <h2>Adicionar aos Favoritos</h2>
                        <input
                            type="text"
                            value={recipeData?.titulo || ""}
                            readOnly
                            className={styles.popupInput}
                        />
                        <button className={styles.saveButton}>Salvar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Busca;
