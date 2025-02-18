import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cadastrar.module.css";
import InputField from "../components/input";
import FeedbackMessage from "../components/feedback";

const Button = ({ text, onClick, variant = "primary" }) => (
  <button
    onClick={onClick}
    className={`${styles.buttonCadastro} ${variant === "primary" ? styles.primary : styles.secondary}`}
  >
    {text}
  </button>
);

export default function CadastrarPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async (name, email, password) => {
    const response = await fetch("https://backend-engsoft.onrender.com/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }
    return await response.text();
  };

  const handleRegister = async () => {
    setFeedbackMessages([]);
    setFeedbackType("");
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFeedbackMessages(["Preencha todos os campos."]);
      setFeedbackType("error");
      return;
    }
    if (password !== confirmPassword) {
      setFeedbackMessages(["As senhas não correspondem."]);
      setFeedbackType("error");
      return;
    }
    try {
      setLoading(true);
      await createUser(name, email, password);
      setLoading(false);
      setFeedbackMessages(["Usuário cadastrado com sucesso! Redirecionando para o login..."]);
      setFeedbackType("success");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setLoading(false);
      setFeedbackMessages([`Erro: ${error.message}`]);
      setFeedbackType("error");
    }
  };

  return (
    <div className={styles.containerCadastro}>
      <div className={styles.cardCadastro}>
        <h1 className={styles.titleCadastro}>Receitas++</h1>
        <h2 className={styles.headingCadastro}>Cadastrar</h2>
        <div className={styles.infoContainerCadastro}>
          <InputField
            label="Nome"
            type="text"
            placeholder="Remy Ratatouille"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="E-mail"
            type="email"
            placeholder="remy@cozinha.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            isPassword={true}
            toggleVisibility={() => setShowPassword(!showPassword)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Confirmar Senha"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            isPassword={true}
            toggleVisibility={() => setShowPassword(!showPassword)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <FeedbackMessage messages={feedbackMessages} type={feedbackType} loading={loading} />
        <Button text="Cadastrar" onClick={handleRegister} variant="primary" />
      </div>
    </div>
  );
}
