import React, { useState } from "react";
import axios from 'axios';
import Container from "../layout/Container";
import styles from "../pages/RedefinirSenha.module.css";
import olho from "../../img/olho.png";
import olho1 from "../../img/olho1.png";
import { useNavigate } from 'react-router-dom';

function RedefinirSenha() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [visiblePasswords, setVisiblePasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = (field) => {
    setVisiblePasswords({
      ...visiblePasswords,
      [field]: !visiblePasswords[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setMessage("Todos os campos são obrigatórios.");
      setMessageType("error");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("As novas senhas não coincidem.");
      setMessageType("error");
      return;
    }

    const data = {
      oldPassword: passwords.oldPassword,
      password: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    };

    axios.put("http://localhost:3334/users", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      setMessage("Senha redefinida com sucesso!");
      setMessageType("success");

      setTimeout(() => {
        navigate('/chamados');
      }, 2000);
    })
    .catch(error => {
      setMessage(error.response?.data?.error || "Erro ao redefinir a senha.");
      setMessageType("error");
    });
  };

  return (
    <Container>
      <header>
        <h1>REDEFINIR SENHA</h1>
      </header>
      <div className={styles.passwordResetContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Senha Antiga</label>
            <input
              type={visiblePasswords.oldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="SENHA ANTIGA"
              value={passwords.oldPassword}
              onChange={handleChange}
              required
            />
            <img
              src={visiblePasswords.oldPassword ? olho : olho1}
              alt="Mostrar/Esconder Senha"
              className={styles.togglePassword}
              onClick={() => handleTogglePassword("oldPassword")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nova Senha</label>
            <input
              type={visiblePasswords.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="NOVA SENHA"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
            <img
              src={visiblePasswords.newPassword ? olho : olho1}
              alt="Mostrar/Esconder Senha"
              className={styles.togglePassword}
              onClick={() => handleTogglePassword("newPassword")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirmar Senha</label>
            <input
              type={visiblePasswords.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="CONFIRMAR SENHA"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
            />
            <img
              src={visiblePasswords.confirmPassword ? olho : olho1}
              alt="Mostrar/Esconder Senha"
              className={styles.togglePassword}
              onClick={() => handleTogglePassword("confirmPassword")}
            />
          </div>
          <footer className={styles.buttongroup}>
            <button type="submit" className={styles.resetButton}>
              REDEFINIR
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate('/user')}
            >
              CANCELAR
            </button>
          </footer>
        </form>
        <p
          className={`${styles.message} ${message ? styles.show : ""} ${
            messageType === "error" ? styles.error : ""
          }`}
        >
          {message}
        </p>
      </div>
    </Container>
  );
}

export default RedefinirSenha;
