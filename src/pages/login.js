import { useState } from "react";
import styles from "./login.module.css";

const InputField = ({ label, type, placeholder }) => (
  <div className={styles.inputContainer}>
    <label className={styles.label}>{label}</label>
    <input type={type} placeholder={placeholder} className={styles.input} />
  </div>
);

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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Receitas<span className={styles.subtitle}>++</span></h1>
        <h2 className={styles.heading}>Entrar</h2>
        
        <InputField label="E-mail" type="email" placeholder="remy@cozinha.com" />
        <InputField label="Senha" type="password" placeholder="********" />
        
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={stayConnected}
            onChange={() => setStayConnected(!stayConnected)}
            className={styles.checkbox}
          />
          <span>Permanecer Conectado</span>
        </div>
        
        <Button text="Entrar" />
        <p className={styles.orText}>ou</p>
        <Button text="Cadastrar" variant="secondary" />
      </div>
    </div>
  );
}
