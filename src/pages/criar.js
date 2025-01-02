import styles from './criar.module.css';
import React, { useState } from "react";

function Criar() {
    const [ingredients, setIngredients] = useState([{ id: 1, quantidade: "", ingrediente: "" }]);
    const [steps, setSteps] = useState([{ id: 1, descricao: "" }]);

    // Funções para adicionar
    const addIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), quantidade: "", ingrediente: "" }]);
    };

    const addStep = () => {
        setSteps([...steps, { id: Date.now(), descricao: "" }]);
    };

    // Funções para deletar
    const handleDeleteIngredient = (id) => {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    };

    const handleDeleteStep = (id) => {
        setSteps(steps.filter((step) => step.id !== id));
    };

    // Funções para atualizar os valores
    const handleIngredientChange = (id, field, value) => {
        setIngredients(ingredients.map((ingredient) =>
            ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
        ));
    };

    const handleStepChange = (id, value) => {
        setSteps(steps.map((step) =>
            step.id === id ? { ...step, descricao: value } : step
        ));
    };

    return (
        <div>
            <div className={styles.container}>
                <h1>Crie sua receita</h1>
                <div className={styles.form}>
                    {/* Informações gerais */}
                    <div className={styles.formGroup}>
                        <label>Título</label>
                        <input id="titulo" type="text" placeholder="Digite o Título" />
                    </div>
                    <div className={styles.formRow}>
                        <div>
                            <label htmlFor="tempoPreparo">Tempo de Preparo</label>
                            <input id="tempoPreparo" type="text" placeholder="Digite o Tempo de Preparo" />
                        </div>
                        <div>
                            <label htmlFor="dificuldade">Dificuldade</label>
                            <select id="dificuldade">
                                <option value="Facil">Fácil</option>
                                <option value="Medio">Média</option>
                                <option value="Dificil">Difícil</option>
                            </select>
                        </div>
                    </div>

                    
                    <div className={styles.formGroup}>
                        <label>Ingredientes</label>
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className={styles.ingredientRow}>
                               
                                <input
                                    type="text"
                                    placeholder="Quantidade"
                                    value={ingredient.quantidade}
                                    onChange={(e) =>
                                        handleIngredientChange(ingredient.id, "quantidade", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Ingrediente"
                                    value={ingredient.ingrediente}
                                    onChange={(e) =>
                                        handleIngredientChange(ingredient.id, "ingrediente", e.target.value)
                                    }
                                />
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => handleDeleteIngredient(ingredient.id)}
                                >
                                 <span> ❌</span> 
                                </button>
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

                  
                    <div className={styles.formGroup}>
                        <label>Passos</label>
                        {steps.map((step,index) => (
                            <div key={step.id} className={styles.stepRow}>
                                <span className={styles.stepCounter}>{index + 1}.</span>
                                <input
                                    type="text"
                                    placeholder="Descrição do passo"
                                    value={step.descricao}
                                    onChange={(e) =>
                                        handleStepChange(step.id, e.target.value)
                                    }
                                />
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => handleDeleteStep(step.id)}
                                >
                                  <span> ❌</span> 
                                </button>
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
                </div>
            </div>
        </div>
    );
}

export default Criar;
