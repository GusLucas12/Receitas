
import React, { useState } from "react";

function EditarReceitas({ receita }) {
    const [ingredients, setIngredients] = useState(receita.ingredientes || []);
    const [steps, setSteps] = useState(receita.passos || []);
    const [titulo, setTitulo] = useState(receita.titulo || "");
    const [tempoPreparo, setTempoPreparo] = useState(receita.tempoPreparo || "");
    const [dificuldade, setDificuldade] = useState(receita.dificuldade || "Facil");

    const addIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), quantidade: "", ingrediente: "" }]);
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
        setIngredients(ingredients.map((ingredient) =>
            ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
        ));
    };

    const handleStepChange = (id, value) => {
        setSteps(steps.map((step) =>
            step.id === id ? { ...step, descricao: value } : step
        ));
    };

    const handleSave = () => {
        if (!titulo.trim() || !tempoPreparo.trim() || !dificuldade.trim()) {
            alert("Preencha todos os campos antes de salvar!");
            return;
        }

        const updatedData = {
            titulo,
            tempoPreparo,
            dificuldade,
            ingredientes: ingredients,
            passos: steps
        };

        console.log("Dados atualizados:", updatedData);
        alert("Receita atualizada com sucesso!");
    };

    return (
        <div>
            <div className={styles.container}>
                <h1>Editar Receita</h1>
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Digite o Título"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <div>
                            <label>Tempo de Preparo</label>
                            <input
                                type="text"
                                value={tempoPreparo}
                                onChange={(e) => setTempoPreparo(e.target.value)}
                                placeholder="Tempo de Preparo"
                            />
                        </div>
                        <div>
                            <label>Dificuldade</label>
                            <select
                                value={dificuldade}
                                onChange={(e) => setDificuldade(e.target.value)}
                            >
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
                                    value={ingredient.quantidade}
                                    placeholder="Quantidade"
                                    onChange={(e) =>
                                        handleIngredientChange(ingredient.id, "quantidade", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={ingredient.ingrediente}
                                    placeholder="Ingrediente"
                                    onChange={(e) =>
                                        handleIngredientChange(ingredient.id, "ingrediente", e.target.value)
                                    }
                                />
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => handleDeleteIngredient(ingredient.id)}
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className={styles.addButton}>
                            +
                        </button>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Passos</label>
                        {steps.map((step, index) => (
                            <div key={step.id} className={styles.stepRow}>
                                <span className={styles.stepCounter}>{index + 1}.</span>
                                <input
                                    type="text"
                                    value={step.descricao}
                                    placeholder="Descrição do passo"
                                    onChange={(e) =>
                                        handleStepChange(step.id, e.target.value)
                                    }
                                />
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => handleDeleteStep(step.id)}
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addStep} className={styles.addButton}>
                            +
                        </button>
                    </div>

                    <div className={styles.saveBtnRow}>
                        <button type="button" onClick={handleSave} className={styles.saveButton}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarReceitas;
