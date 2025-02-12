import React, { useState, useEffect } from "react";
import styles from "./receitas.module.css";
import Card from "../components/card.js";
import FeedbackMessage from "../components/feedback.js";

function Receitas() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(6);
      }
      setCurrentPage(1);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Receitas Disponíveis</h1>
        <FeedbackMessage
          messages={feedbackMessages}
          type={feedbackType}
          loading={loading}
        />
        <div className={styles.cardsRow}>
          {currentRecipes.map((recipe) => (
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
        <div className={styles.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.activePage : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receitas;
