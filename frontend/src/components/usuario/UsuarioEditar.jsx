import React, { useState } from "react";
import { uploadImageProfile } from "../../functions/function";
import Racoon from "../../img/RACOON.svg"; // Imagem padrão quando não há foto
import styles from "../pages/EditarUsuarios.module.css";

function UsuarioEditar() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    profilePicture: localStorage.getItem("profilePicture") || "", // Inicializar com o valor do localStorage
  });

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedImageUrl = await uploadImageProfile(file);
        setUser({ ...user, profilePicture: uploadedImageUrl });

        // Salvar a imagem no localStorage
        localStorage.setItem("profilePicture", uploadedImageUrl);

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

  return (
    <div className={styles.profileContainer}>
      <h1>Editar Perfil</h1>

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

      <div className={styles.inputContainer}>
        <label>Nome</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Sobrenome</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.saveButton}
          onClick={() => console.log("Usuário salvo:", user)}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default UsuarioEditar;
