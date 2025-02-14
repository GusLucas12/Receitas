import styles from "./input.module.css";

const InputField = ({ label, type, placeholder, isPassword, toggleVisibility, value, onChange, name }) => (
  <div className={styles.inputContainer}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <div className={styles.passwordWrapper}>
      <input
        id={name}
        name={name} // Importante para identificar qual campo está sendo alterado
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.inputRounded}
      />
      {isPassword && (
        <button type="button" onClick={toggleVisibility} className={styles.toggleButton}>
          {type === "password" ? "👁️" : "🚫"}
        </button>
      )}
    </div>
  </div>
);

export default InputField;
