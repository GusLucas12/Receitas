import styles from './editarUsu.module.css'
import React, { useState } from 'react';

function Editar() {
    const [profileData, setProfileData] = useState({
        name: "Jose Aldo",
        email: "josealdo@receitas.com",
        bio: "Gosto de Cozinhar bolos e massas",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Lógica para salvar o perfil
        alert("Perfil salvo com sucesso!");
    };
    return (
        <div className={styles.editProfileContainer}>
            <h1>Editar Perfil</h1>

            <div className={styles.fotoNome}>
                <div className={styles.foto}></div>
                <button className={styles.chooseImage}>Escolher uma imagem</button>
            </div>

            <form className={styles.form}>
                <label>Nome</label>
                <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                />

                <label>E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                />

                <label>Sobre mim :</label>
                <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                />

                <hr />

                <h2>Senha</h2>
                <label>Sua nova senha</label>
                <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleChange}
                />

                <label>Confirme sua senha</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="button" onClick={handleSave} className={styles.saveButton}>
                    Salvar
                </button>
            </form>
        </div>
    )
}
export default Editar;