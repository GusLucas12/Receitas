import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./busca.module.css";
import FeedbackMessage from "../components/feedback";

function Busca() {
  const [searchParams] = useSearchParams();
  const initialRecipe = searchParams.get("query") || "";
  const [recipeQuery, setRecipeQuery] = useState(initialRecipe);
  const [recipeData, setRecipeData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialRecipe) {
      fetchRecipe(initialRecipe);
    }
  }, [initialRecipe]);

  const addFeedbackMessage = (message, type) => {
    setFeedbackMessages((prev) => [...prev, message]);
    setFeedbackType(type);
  };

  const clearFeedbackMessages = () => {
    setFeedbackMessages([]);
    setFeedbackType("");
  };

  const fetchRecipe = async (query) => {
    setIsLoading(true);
    const text = `me de uma receita de ${query}, se limite a apenas uma receita por vez , 
        todas as respostas precisam estar relacionadas a receitas, priorizando as brasileiras 
        tradicionais e receitas internacionais amplamente conhecidas. As respostas devem ser apresentadas
        exclusivamente no formato JSON. Sempre formate as respostas com nome, tempo_de_preparo, 
        dificuldade (Fácil, Média e Difícil), ingredientes(ingrediente , quantidade), passos e sustentaveis(
        nesse campo me forneça sugestões sustentaveis do que fazer com restos , sobras dos ingredientes e etc ).`;
    try {
      const response = await fetch("https://backend-engsoft.onrender.com/askthequestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      let rawText = await response.text();
      rawText = rawText.replace(/```json|```/g, "").trim();
      const jsonResponse = JSON.parse(rawText);
      setRecipeData(jsonResponse);
    } catch (error) {
      addFeedbackMessage("Erro ao buscar a receita. Tente novamente.", "error");
    
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFeedbackMessages();
    if (!recipeQuery.trim()) {
      addFeedbackMessage("Insira uma receita ou um ingrediente.", "error");
    } else {
      fetchRecipe(recipeQuery);
    }
  };

  const handleAddToFavorites = () => {
    if (!recipeData) {
      addFeedbackMessage("Nenhuma receita disponível para adicionar aos favoritos.", "error");
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSave = async () => {
    const titulo = document.querySelector(`.${styles.popupInput}`).value.trim();
    if (!titulo || !recipeData) {
      addFeedbackMessage("Erro: Nenhuma receita encontrada ou título está vazio.", "error");
      return;
    }
    const email = localStorage.getItem("userEmail");
    const data = {
      name: titulo,
      ingredients: recipeData.ingredientes.map((ing) => `${ing.quantidade} ${ing.ingrediente}`).join(", "),
      prepareTime: recipeData.tempo_de_preparo,
      difficulty: recipeData.dificuldade,
      prepareMode: recipeData.passos.map((passo) => ` ${passo}`).join("\n"),
      sustentable: recipeData.sustentaveis.map((item) => ` ${item}`).join("\n"),
      isIa: true,
      user: email
    };
    try {
      const response = await fetch("https://backend-engsoft.onrender.com/createRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar a receita. Tente novamente.");
      }
      addFeedbackMessage("Receita salva com sucesso!", "success");
      closePopup();
    } catch (error) {
      addFeedbackMessage(`Erro ao salvar a receita: ${error.message}`, "error");
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
              value={recipeQuery}
              onChange={(e) => setRecipeQuery(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              🔍
            </button>
          </form>
        </div>
        <FeedbackMessage messages={feedbackMessages} type={feedbackType} loading={isLoading} />
        <div className={styles.telaDeBusca}>
          {recipeData && (
            <>
              <button onClick={handleAddToFavorites} className={styles.favoriteButton}>
                ⭐
              </button>
              <div className={styles.recipeDetails}>
                <h1>{recipeData.nome}</h1>
                <div className={styles.recipeContext}>
                  <p>
                    <strong>Tempo de preparo:</strong>{" "}
                    <span>{recipeData.tempo_de_preparo}</span>
                  </p>
                  <p>
                    <strong>Dificuldade:</strong>{" "}
                    <span>{recipeData.dificuldade}</span>
                  </p>
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
                <div className={styles.passos}>
                  <h3>Sugestões sustentáveis</h3>
                  <ol>
                    {recipeData.sustentaveis.map((item, index) => (
                      <li key={index}>{item}</li>
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
            <button className={styles.closeButton} onClick={closePopup}>
              ✖
            </button>
            <h2>Adicionar aos Favoritos</h2>
            <input
              type="text"
              value={recipeData.nome}
              readOnly
              className={styles.popupInput}
            />
            <button className={styles.saveButton} onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Busca;
