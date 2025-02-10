import styles from "./input.module.css";

const InputField = ({ label, type, placeholder, isPassword, toggleVisibility }) => (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.passwordWrapper}>
        <input type={type} placeholder={placeholder} className={styles.inputRounded} />
        {isPassword && (
          <button type="button" onClick={toggleVisibility} className={styles.toggleButton}>
            {type === "password" ? "👁️" : "🚫"}
          </button>
        )}
      </div>
    </div>
  );
  
  export default InputField;