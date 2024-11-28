import React, { useState } from "react";

const RecipePage = () => {
    const [recipe, setRecipe] = useState("");
    const [responseText, setResponseText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recipe) {
            // Formata o texto da requisição
            //const text = "me de uma receita de ${recipe}, todas as respostas precisam estar relacionadas a receitas, priorizando as brasileiras tradicionais e receitas internacionais amplamente conhecidas. As respostas devem ser apresentadas exclusivamente no formato JSON, com as propriedades: nome (nome da receita), ingredientes (lista detalhada de ingredientes), tempo_de_preparo (tempo estimado de preparo em minutos ou horas), dificuldade_de_preparo (nível de dificuldade: fácil, médio ou difícil) e preparo (passo a passo detalhado para executar a receita). Além disso, as respostas devem ser limitadas a 250 palavras e não podem incluir informações fora do contexto de receitas ou culinária.";

            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    text: "Bolo de chocolate",
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };
                const response = await fetch(
                    "https://backend-engsoft.onrender.com/askthequestion",
                    requestOptions
                )

                if (response.ok) {
                    const textResponse = await response.text();
                    setResponseText(textResponse); // Exibe a resposta no formato de texto
                } else {
                    console.error("Erro na requisição:", response.status);
                    setResponseText("Houve um erro na requisição.");
                }
            } catch (error) {
                console.error("Erro:", error);
                setResponseText("Ocorreu um erro ao tentar se comunicar com o servidor.");
            }
            setRecipe(""); // Limpa o campo após o envio
        } else {
            alert("Por favor, insira uma receita!");
        }
    };

    return (
        <div>
            <h1>Receitas Culinárias</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome da Receita:
                    <input
                        type="text"
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                    />
                </label>
                <button type="submit">Enviar</button>
            </form>

            {responseText && (
                <div>
                    <h2>Resposta do Servidor:</h2>
                    <pre>{responseText}</pre> {/* Exibe a resposta sem tratamento */}
                </div>
            )}
        </div>
    );
};

export default RecipePage;
