import { useState } from "react";
import styles from "./login.module.css";
import InputField from "../components/input";

const Button = ({ text, onClick, variant = "primary" }) => (
    <button
        onClick={onClick}
        className={`${styles.button} ${variant === "primary" ? styles.primary : styles.secondary}`}
    >
        {text}
    </button>
);

export default function CadastrarPage() {

    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Receitas++</h1>
                <h2 className={styles.heading}>Entrar</h2>

                <div className={styles.infoContainer}>
                    <InputField label="Nome" type="name" placeholder="Remy Ratatouile" />
                    <InputField label="E-mail" type="email" placeholder="remy@cozinha.com" />
                    <InputField
                        label="Senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        isPassword={true}
                        toggleVisibility={() => setShowPassword(!showPassword)}
                    />
                     <InputField
                        label="Confirmar Senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        isPassword={true}
                        toggleVisibility={() => setShowPassword(!showPassword)}
                    />
                 
                </div>
                <Button text="Cadastrar" variant="primary" />
            </div>
        </div>
    );
}
