import React, { useState, useEffect } from 'react';
import styles from './receitas.module.css';
import Card from '../components/card.js';

function Receitas() {
    const [recipes, setRecipes] = useState([]);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://backend-engsoft.onrender.com/getAllRecipes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar receitas');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error(error);
                alert('Erro ao carregar receitas.');
            }
        };

        fetchRecipes();
    }, []);
    const deleteRecipe = async (id) => {
        try {
            const response = await fetch('https://backend-engsoft.onrender.com/deleteRecipe', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setRecipes(recipes.filter((recipe) => recipe.id !== id));
                alert('Receita deletada com sucesso!');
            } else {
                alert('Erro ao deletar receita.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao deletar receita.');
        }
    };
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Receitas Disponíveis</h1>
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
