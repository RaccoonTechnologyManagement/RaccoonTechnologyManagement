import React, { useState } from "react";
import Container from "../layout/Container";
import styles from "../pages/RedefinirSenha.module.css";
import olho from "../../img/olho.png";
import olho1 from "../../img/olho1.png";
import { NavLink } from "react-router-dom";

function RedefinirSenha() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visiblePasswordField, setVisiblePasswordField] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = (field) => {
    setVisiblePasswordField(visiblePasswordField === field ? null : field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwords.oldPassword === passwords.newPassword) {
      setMessage("A nova senha não pode ser igual à senha antiga.");
      setMessageType("error"); 
    } else if (passwords.newPassword === passwords.confirmPassword) {
      setMessage("Senha redefinida com sucesso!");
      setMessageType("success"); 
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setVisiblePasswordField(null);

      
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } else {
      setMessage("As novas senhas não coincidem.");
      setMessageType("error"); 
    }
  };

  return (
    <Container>
      <header>
        <h1>REDEFINIR SENHA</h1>
      </header>
      <div className={styles.passwordResetContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>SENHA ANTIGA</label>
            <input
              type={visiblePasswordField === "oldPassword" ? "text" : "password"}
              name="oldPassword"
              placeholder="SENHA ANTIGA"
              value={passwords.oldPassword}
              onChange={handleChange}
              required
            />
            <img
              src={visiblePasswordField === "oldPassword" ? olho : olho1}
              alt="Mostrar/Esconder Senha"
              className={styles.togglePassword}
              onClick={() => handleTogglePassword("oldPassword")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>NOVA SENHA</label>
            <input
              type={visiblePasswordField === "newPassword" ? "text" : "password"}
              name="newPassword"
              placeholder="NOVA SENHA"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
            <img
              src={visiblePasswordField === "newPassword" ? olho : olho1}
              alt="Mostrar/Esconder Senha"
              className={styles.togglePassword}
              onClick={() => handleTogglePassword("newPassword")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>CONFIRMAR SENHA</label>
            <input
              type={visiblePasswordField === "confirmPassword" ? "text" : "password"}
              name="confirmPassword"
              placeholder="CONFIRMAR SENHA"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
            />
            <img
              src={visiblePasswordField === "confirmPassword" ? olho : olho1}
              alt="Mostrar/Esconder Senha"
              className={styles.togglePassword}
              onClick={() => handleTogglePassword("confirmPassword")}
            />
          </div>
          <footer className={styles.buttongroup}>
            <button type="submit" className={styles.resetButton}>
              REDEFINIR
            </button>
            <button type="button" className={styles.cancelButton}>
              CANCELAR
            </button>
          </footer>
        </form>
        <p className={`${styles.message} ${message ? styles.show : ""} ${messageType === "error" ? styles.error : ""}`}>
          {message}
        </p>
      </div>
    </Container>
  );
}

export default RedefinirSenha;
