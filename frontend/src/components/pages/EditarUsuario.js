import React, { useState } from "react";
import Container from "../layout/Container";
import Racoon from "../../img/RACOON.svg";
import padlock from "../../img/padlock.svg";
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
    profilePicture: "" // Começa vazio para garantir a exibição do Racoon
  });

  const [userStatus, setUserStatus] = useState("offline");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleEdit = () => {
    console.log("Botão Editar clicado");
    // Adicione a lógica para salvar as alterações, se necessário
  };

  const handleResetPassword = () => {
    console.log("Botão Redefinir Senha clicado");
    // Adicione a lógica para redefinir a senha, se necessário
  };

  return (
    <Container>
      <div className={styles.profileContainer}>
        <h1>Meu Perfil</h1>
        
        <div className={styles.profileGrid}>
          <div className={styles.firstContainer}>
            <div className={styles.profile}>
              {/* Campos de perfil */}
              <div className={`${styles.profileItem} ${styles.inputContainer}`}>
                <label>Usuário</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  disabled
                />
                <img src={padlock} alt="cadeado" className={styles.lockIcon} />
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
                <label htmlFor="profilePictureInput" style={{ cursor: 'pointer' }}>
                  <img 
                    src={user.profilePicture || Racoon} 
                    alt="Profile" 
                    width="328" 
                    height="306"
                    className={styles.circularImage}
                  />
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  id="profilePictureInput"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureChange}
                />
                <div 
                  className={`${styles.active} ${userStatus === "online" ? styles.online : styles.offline}`}
                >
                  <span>{userStatus.toUpperCase()}</span>
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
