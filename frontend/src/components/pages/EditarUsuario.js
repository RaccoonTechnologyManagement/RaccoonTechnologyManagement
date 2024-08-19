import React, { useState } from "react";
import Container from "../layout/Container";
import Racoon from "../../img/RACOON.svg";
import padlock from "../../img/padlock.svg"; // Certifique-se de importar a imagem
import styles from "../pages/EditarUsuarios.module.css";
import { NavLink } from "react-router-dom";
import InputMask from "react-input-mask";

function User() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    company: "",
    branch: "",
    department: "",
    category: "",
    position: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEdit = () => {
    console.log("Botão Editar clicado");
  };

  const handleResetPassword = () => {
    console.log("Botão Redefinir Senha clicado");
  };

  return (
    <Container>
      <div className={styles.profileContainer}>
        <h1>Meu Perfil</h1>
        
        <div className={styles.profileGrid}>
          <div className={styles.firstContainer}>
            <div className={styles.profile}>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Usuário</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Nome</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Sobrenome</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.avatar}>
              <aside className={styles.profileAvatar}>
                <img src={Racoon} alt="Profile" />
                <div className={styles.active}>
                  <span>ATIVO</span>
                </div>
              </aside>
            </div>
          </div>
          
          <div className={styles.bdRisk}>
            <div className={styles.Risk}></div>
          </div>

          <div className={styles.secondContainer}>
            <div className={styles.business}>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Empresa</label>
                <input
                  type="text"
                  name="company"
                  value={user.company}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Filial</label>
                <input
                  type="text"
                  name="branch"
                  value={user.branch}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Departamento</label>
                <input
                  type="text"
                  name="department"
                  value={user.department}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Categoria</label>
                <input
                  type="text"
                  name="category"
                  value={user.category}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
            </div>

            <div className={styles.information}>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Cargo</label>
                <input
                  type="text"
                  name="position"
                  value={user.position}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled
                />
                <img
                  src={padlock}
                  alt="cadeado"
                  className={styles.lockIcon}
                />
              </div>
              <div className={styles.profileItem}>
                <label>Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.actions}>
                <NavLink to={`/user`}>
                  <button id={styles.first} onClick={handleEdit}>SALVAR</button>
                </NavLink>
                <NavLink to={`/user`}>
                  <button id={styles.last} onClick={handleResetPassword}>CANCELAR</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default User;
