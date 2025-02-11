import React, { useState, useEffect } from "react";
import styles from "./receitas.module.css";
import Card from "../components/card.js";
import FeedbackMessage from "../components/feedback.js";

function Receitas() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://backend-engsoft.onrender.com/getAllRecipes"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setFeedbackType("error");
        setFeedbackMessages(["Erro ao carregar receitas."]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-engsoft.onrender.com/deleteRecipe",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
        setFeedbackType("success");
        setFeedbackMessages(["Receita deletada com sucesso!"]);
      } else {
        setFeedbackType("error");
        setFeedbackMessages(["Erro ao deletar receita."]);
      }
    } catch (error) {
      console.error(error);
      setFeedbackType("error");
      setFeedbackMessages(["Erro ao deletar receita."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Receitas Disponíveis</h1>
        {/* Feedback para o usuário */}
        <FeedbackMessage
          messages={feedbackMessages}
          type={feedbackType}
          loading={loading}
        />
        <div className={styles.cardsRow}>
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              title={recipe.name}
              difficulty={recipe.difficulty}
              prepareTime={recipe.prepareTime}
              recipe={recipe}
              onDelete={() => deleteRecipe(recipe.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Receitas;
