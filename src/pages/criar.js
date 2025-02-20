import React, { useState, useEffect } from "react"; 
import styles from "./criar.module.css";
import FeedbackMessage from "../components/feedback";
import useUserInfo from "../components/user";

function Criar() {
  const [ingredients, setIngredients] = useState([
    { id: 1, quantidade: "", ingrediente: "" },
  ]);
  const [steps, setSteps] = useState([{ id: 1, descricao: "" }]);
  const [sustentaveis, setSustentaveis] = useState([{ id: 1, descricao: "" }]);


  const [loading, setLoading] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");

  const { userData, error: userError, loading: userLoading, getUserInfo } =
    useUserInfo();

  
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

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

    if (errors.length > 0) {
      setFeedbackType("error");
      setFeedbackMessages(errors);
      return;
    }

    if (!userData || !userData.id) {
      setFeedbackType("error");
      setFeedbackMessages([
        "Erro: usuário não autenticado. Faça login novamente.",
      ]);
      return;
    }

    setLoading(true);
    setFeedbackMessages([]);

    const data = {
      name: titulo,
      userId: userData.id, 
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
        let errorMessage;
        const errorContentType = response.headers.get("content-type");
        if (errorContentType && errorContentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage =
            errorData.message || "Erro ao salvar a receita. Tente novamente.";
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
        setFeedbackMessages([
          `Receita salva com sucesso: ${
            result.message || "Sem mensagem adicional"
          }`,
        ]);
      } else {
        result = await response.text();
        setFeedbackMessages([`Receita salva com sucesso`]);
      }
      setFeedbackType("success");
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
          loading={loading || userLoading}
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
                <span>.</span>
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
