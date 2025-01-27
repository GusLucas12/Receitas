import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./criar.module.css";

function EditarReceitas() {
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [tempoPreparo, setTempoPreparo] = useState("");
    const [dificuldade, setDificuldade] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(
                    `https://backend-engsoft.onrender.com/getById?id=${id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar a receita");
                }

                let rawText = await response.text();
                console.log(rawText);
                const recipe = JSON.parse(rawText);

                const parsedIngredients = recipe.ingredients
                    ? recipe.ingredients.split(",").map((item) => {
                        const [quantidade, ...ingrediente] = item.trim().split(" ");
                        return {
                            id: Date.now() + Math.random(), // Gerar um ID único
                            quantidade,
                            ingrediente: ingrediente.join(" "),
                        };
                    })
                    : [];


                const parsedSteps = recipe.prepareMode
                    ? recipe.prepareMode.split("\n").map((step, index) => ({
                        id: Date.now() + index,
                        descricao: step.trim(),
                    }))
                    : [];

                setTitulo(recipe.name || "");
                setTempoPreparo(recipe.prepareTime || "");
                setDificuldade(recipe.difficulty || "");
                setIngredients(parsedIngredients);
                setSteps(parsedSteps);
            } catch (error) {
                console.error("Erro ao carregar a receita:", error);
                alert("Erro ao carregar os dados da receita.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchRecipe();
    }, [id]);

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

    const handleSave = async () => {

        const updatedData = {
            id: id,
            name: titulo,
            ingredients: ingredients
                .map((ing) => `${ing.quantidade} ${ing.ingrediente}`)
                .join(", "),
            prepareTime: tempoPreparo,
            difficulty: dificuldade,
            prepareMode: steps
                .map((step) => `${step.descricao}`)
                .join("\n"),
        };

        try {
            const response = await fetch(`https://backend-engsoft.onrender.com/updateRecipe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar a receita");
            }

            alert("Receita atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar a receita:", error);
            alert("Erro ao salvar os dados da receita.");
        }
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

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
                                onChange={(e) => {
                                    if (e.target.value !== dificuldade) {
                                        setDificuldade(e.target.value);
                                    }
                                }}
                            >
                                <option value="easy">Fácil</option>
                                <option value="medium">Média</option>
                                <option value="hard">Difícil</option>
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
