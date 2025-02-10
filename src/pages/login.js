import { useState } from "react";
import styles from "./login.module.css";
import InputField from "../components/input";
import { Link } from "react-router-dom";
const Button = ({ text, onClick, variant = "primary" }) => (
    <button
        onClick={onClick}
        className={`${styles.button} ${variant === "primary" ? styles.primary : styles.secondary}`}
    >
        {text}
    </button>
);

export default function LoginPage() {
    const [stayConnected, setStayConnected] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Receitas++</h1>
                <h2 className={styles.heading}>Entrar</h2>

                <div className={styles.infoContainer}>
                    <InputField label="E-mail" type="email" placeholder="remy@cozinha.com" />
                    <InputField
                        label="Senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        isPassword={true}
                        toggleVisibility={() => setShowPassword(!showPassword)}
                    />
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={stayConnected}
                            onChange={() => setStayConnected(!stayConnected)}
                            className={styles.checkbox}
                        />
                        <span>Permanecer Conectado</span>
                    </div>
                </div>




                <Button text="Entrar" />
                <p className={styles.orText}><span>---------</span>ou<span>---------</span></p>

                <Link to='/cadastrar'><Button text="Cadastrar" variant="secondary" /></Link>
            </div>
        </div>
    );
}
