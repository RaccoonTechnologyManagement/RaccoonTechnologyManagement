import React, { useState } from "react";
import { uploadImageProfile } from "../../functions/function";
import Racoon from "../../img/RACOON.svg"; // Imagem padrão quando não há foto
import styles from "../pages/CriarUsuario.module.css";
import Container from "../layout/Container";

function CriarUsuario() {
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
    profilePicture: "",
  });

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedImageUrl = await uploadImageProfile(file);
        setUser({ ...user, profilePicture: uploadedImageUrl });
        console.log("Upload bem-sucedido:", uploadedImageUrl);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        alert("Não foi possível enviar a imagem. Tente novamente.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCreate = () => {
    console.log("Novo usuário criado:", user);
    alert("Usuário criado com sucesso!");
    // Aqui você pode implementar a lógica para enviar os dados para o backend
  };

  return (
    <Container>
      <div className={styles.profileContainer}>
        <h1>Criar Usuário</h1>

        <div className={styles.avatar}>
          <label htmlFor="profilePictureInput" style={{ cursor: "pointer" }}>
            <img
              src={user.profilePicture || Racoon}
              alt="Profile"
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
        </div>

        {/* Inputs agrupados em linhas */}
        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <label>Usuário</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Nome</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <label>Sobrenome</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Empresa</label>
            <input
              type="text"
              name="company"
              value={user.company}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <label>Filial</label>
            <input
              type="text"
              name="branch"
              value={user.branch}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Departamento</label>
            <input
              type="text"
              name="department"
              value={user.department}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <label>Categoria</label>
            <input
              type="text"
              name="category"
              value={user.category}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Cargo</label>
            <input
              type="text"
              name="position"
              value={user.position}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Telefone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.createButton} onClick={handleCreate}>
            Criar
          </button>
        </div>
      </div>
    </Container>
  );
}

export default CriarUsuario;
