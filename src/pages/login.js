import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./login.module.css";
import InputField from "../components/input";
import FeedbackMessage from "../components/feedback";

const Button = ({ text, onClick, variant = "primary" }) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${
      variant === "primary" ? styles.primary : styles.secondary
    }`}
  >
    {text}
  </button>
);

const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `https://backend-engsoft.onrender.com/user/login?email=${email}&password=${password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Usuário não autorizado");
    }
    return await response.text();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayConnected, setStayConnected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessages([]);
    if (!email || !password) {
      setMessages(["Preencha todos os campos."]);
      setType("error");
      return;
    }
    setLoading(true);
    try {
      const timestamp = await loginUser(email, password);
      setMessages(["Login realizado com sucesso!"]);
      setType("success");
      localStorage.setItem("authToken", timestamp);

      localStorage.setItem("userEmail", email);
      if (stayConnected) {
        localStorage.setItem("stayConnected", "true");
      }
   
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessages([error.message]);
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Receitas++</h1>
        <h2 className={styles.heading}>Entrar</h2>

        <FeedbackMessage messages={messages} type={type} loading={loading} />

        <div className={styles.infoContainer}>
          <InputField
            label="E-mail"
            type="email"
            placeholder="remy@cozinha.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            isPassword={true}
            toggleVisibility={() => setShowPassword(!showPassword)}
            onChange={(e) => setPassword(e.target.value)}
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

        <Button text="Entrar" onClick={handleLogin} />
        <p className={styles.orText}>
          <span>---------</span>ou<span>---------</span>
        </p>
        <Link to="/cadastrar">
          <Button text="Cadastrar" variant="secondary" />
        </Link>
      </div>
    </div>
  );
}
