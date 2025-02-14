import React, { useState } from "react";
import styles from "./criar.module.css";
import FeedbackMessage from "../components/feedback";

function Criar() {
  const [ingredients, setIngredients] = useState([
    { id: 1, quantidade: "", ingrediente: "" },
  ]);
  const [steps, setSteps] = useState([{ id: 1, descricao: "" }]);
  const [sustentaveis, setSustentaveis] = useState([{ id: 1, descricao: "" }]);

  // Estados para feedback e carregamento
  const [loading, setLoading] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");

  const addSustentavel = () => {
    setSustentaveis([...sustentaveis, { id: Date.now(), descricao: "" }]);
  };

  const handleSustentavelChange = (id, value) => {
    setSustentaveis(
      sustentaveis.map((item) =>
        item.id === id ? { ...item, descricao: value } : item
      )
    );
  };

  const handleDeleteSustentavel = (id) => {
    setSustentaveis(sustentaveis.filter((item) => item.id !== id));
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), quantidade: "", ingrediente: "" },
    ]);
  };

  const addStep = () => {
    setSteps([...steps, { id: Date.now(), descricao: "" }]);
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleDeleteStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleIngredientChange = (id, field, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleStepChange = (id, value) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, descricao: value } : step
      )
    );
  };

  const handleSave = async () => {
    const titulo = document.getElementById("titulo").value.trim();
    const tempoPreparo = document.getElementById("tempoPreparo").value.trim();
    const dificuldade = document.getElementById("dificuldade").value;
    const hasEmptyIngredient = ingredients.some(
      (ingredient) =>
        !ingredient.quantidade.trim() || !ingredient.ingrediente.trim()
    );
    const hasEmptyStep = steps.some((step) => !step.descricao.trim());
    const hasEmptySustentavel = sustentaveis.some(
      (item) => !item.descricao.trim()
    );

    // Acumula todos os erros em um array
    const errors = [];
    if (!titulo) {
      errors.push("O campo Título é obrigatório.");
    }
    if (!tempoPreparo) {
      errors.push("O campo Tempo de Preparo é obrigatório.");
    }
    if (hasEmptyIngredient) {
      errors.push("Preencha todos os campos dos ingredientes.");
    }
    if (hasEmptyStep) {
      errors.push("Preencha todos os campos dos passos.");
    }
    if (hasEmptySustentavel) {
      errors.push("Preencha todos os campos das sugestões sustentáveis.");
    }

    // Se houver erros, exibe o feedback e não prossegue
    if (errors.length > 0) {
      setFeedbackType("error");
      setFeedbackMessages(errors);
      return;
    }

    setLoading(true);
    setFeedbackMessages([]);
    const email = localStorage.getItem("userEmail");
    const data = {
      name: titulo,
      user: email,
      ingredients: ingredients
        .map((ing) => `${ing.quantidade} ${ing.ingrediente}`)
        .join(", "),
      prepareTime: tempoPreparo,
      difficulty: dificuldade,
      prepareMode: steps
        .map((step, index) => `${index + 1}. ${step.descricao}`)
        .join("\n"),
      sustentable: sustentaveis
        .map((item, index) => `${index + 1}. ${item.descricao}`)
        .join("\n"),
    };

    try {
      const response = await fetch(
        "https://backend-engsoft.onrender.com/createRecipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao salvar a receita. Tente novamente."
        );
      }

      const result = await response.json();
      setFeedbackType("success");
      setFeedbackMessages([
        `Receita salva com sucesso: ${result.message || "Sem mensagem adicional"}`,
      ]);
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessages([error.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Crie sua receita</h1>
        {/* Feedback para o usuário */}
        <FeedbackMessage
          messages={feedbackMessages}
          type={feedbackType}
          loading={loading}
        />
        <div className={styles.form}>
          {/* Título */}
          <div className={styles.formGroup}>
            <label>Título</label>
            <input
              id="titulo"
              type="text"
              placeholder="Digite o Título"
              className={styles.inputCriar}
            />
          </div>

          {/* Tempo de Preparo e Dificuldade */}
          <div className={styles.formRow}>
            <div>
              <label htmlFor="tempoPreparo">Tempo de Preparo</label>
              <input
                id="tempoPreparo"
                type="text"
                placeholder="Digite o Tempo de Preparo"
                className={styles.inputCriar}
              />
            </div>
            <div>
              <label htmlFor="dificuldade">Dificuldade</label>
              <select id="dificuldade">
                <option value="easy">Fácil</option>
                <option value="medium">Média</option>
                <option value="hard">Difícil</option>
              </select>
            </div>
          </div>

          {/* Ingredientes */}
          <div className={styles.formGroup}>
            <label>Ingredientes</label>
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className={styles.ingredientRow}>
                <input
                  type="text"
                  placeholder="Quantidade"
                  value={ingredient.quantidade}
                  onChange={(e) =>
                    handleIngredientChange(
                      ingredient.id,
                      "quantidade",
                      e.target.value
                    )
                  }
                  className={`${styles.inputCriar} ${styles.quantityInput}`}
                />
                <div className={styles.inputWithDelete}>
                  <input
                    type="text"
                    placeholder="Ingrediente"
                    value={ingredient.ingrediente}
                    onChange={(e) =>
                      handleIngredientChange(
                        ingredient.id,
                        "ingrediente",
                        e.target.value
                      )
                    }
                    className={styles.inputCriar}
                  />
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                  >
                    <span>❌</span>
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className={styles.addButton}
            >
              <span>+</span>
            </button>
          </div>

          {/* Passos */}
          <div className={styles.formGroup}>
            <label>Passos</label>
            {steps.map((step, index) => (
              <div key={step.id} className={styles.stepRow}>
                <span className={styles.stepCounter}>{index + 1}.</span>
                <div className={styles.inputWithDelete}>
                  <input
                    type="text"
                    placeholder="Descrição do passo"
                    value={step.descricao}
                    onChange={(e) => handleStepChange(step.id, e.target.value)}
                    className={styles.inputCriar}
                  />
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteStep(step.id)}
                  >
                    <span>❌</span>
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className={styles.addButton}
            >
              <span>+</span>
            </button>
          </div>

          {/* Sugestões Sustentáveis */}
          <div className={styles.formGroup}>
            <label>Sugestões Sustentáveis</label>
            {sustentaveis.map((item, index) => (
              <div key={item.id} className={styles.stepRow}>
                <span className={styles.stepCounter}>{index + 1}.</span>
                <div className={styles.inputWithDelete}>
                  <input
                    type="text"
                    placeholder="Descrição da sugestão"
                    value={item.descricao}
                    onChange={(e) =>
                      handleSustentavelChange(item.id, e.target.value)
                    }
                    className={styles.inputCriar}
                  />
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteSustentavel(item.id)}
                  >
                    <span>❌</span>
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSustentavel}
              className={styles.addButton}
            >
              <span>+</span>
            </button>
          </div>

          {/* Botão Salvar */}
          <div className={styles.saveBtnRow}>
            <button
              type="button"
              onClick={handleSave}
              className={styles.saveButton}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Criar;
