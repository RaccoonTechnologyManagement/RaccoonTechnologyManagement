import React, { useState, useEffect } from "react";
import ContainerUser from "./ContainerUser";
import Racoon from "../../img/RACOON.svg";
import styles from "../pages/User.module.css";

function Usuario() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: localStorage.getItem("profilePicture") || "", // Recuperar do localStorage
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarInformacoesPessoaLogada = async () => {
      try {
        // Aqui seria o local para chamar o backend, se necessário.
        const savedProfilePicture = localStorage.getItem("profilePicture");
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: savedProfilePicture || prevUser.profilePicture,
        }));
      } catch (error) {
        console.error("Erro ao carregar informações:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarInformacoesPessoaLogada();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <ContainerUser>
      <div className={styles.profileContainer}>
        <h1>Meu Perfil</h1>

        <div className={styles.profileGrid}>
          <div className={styles.avatar}>
            <img
              src={user.profilePicture || Racoon}
              alt="Profile"
              className={styles.circularImage}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Nome</label>
            <input type="text" value={user.firstName} disabled />
          </div>

          <div className={styles.inputContainer}>
            <label>Sobrenome</label>
            <input type="text" value={user.lastName} disabled />
          </div>
        </div>
      </div>
    </ContainerUser>
  );
}

export default Usuario;
