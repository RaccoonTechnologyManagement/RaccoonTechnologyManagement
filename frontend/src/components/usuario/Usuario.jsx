import React, { useState, useEffect } from "react";
import ContainerUser from "./ContainerUser";
import Racoon from "../../img/RACOON.svg";
import styles from "../pages/User.module.css";
import { NavLink } from "react-router-dom";
import InputMask from "react-input-mask";
import { getInfoPerson } from "../data/api";

function Usuario() {
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
    profilePicture: "" 
  });

  const [isLoading, setIsLoading] = useState(true);

  async function carregarInformacoesPessoa()
  {
    try
    {
        let asset = await getInfoPerson();
        return asset;
    }
    catch(erro)
    {
        return [];
    }
  }

  useEffect(() => {
    const carregarInformacoesPessoaLogada = async () => {
        const info = await carregarInformacoesPessoa();
        setUser(info);
        setUserStatus(user.person_activy ? "online" : "offline")
        setIsLoading(false);
      };
      carregarInformacoesPessoaLogada();
}, []);

  const [userStatus, setUserStatus] = useState();

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

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <ContainerUser>
      <div className={styles.profileContainer}>
        <h1>Meu Perfil</h1>
        
        <div className={styles.profileGrid}>
          <div className={styles.firstContainer}>
            <div className={styles.profile}>
              <div className={styles.profileItem}>
                <label>Usuário</label>
                <input
                  type="text"
                  name="username"
                  disabled
                  value={user.user.username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.profileItem}>
                <label>Nome</label>
                <input
                  type="text"
                  name="firstName"
                  disabled
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.profileItem}>
                <label>Sobrenome</label>
                <input
                  type="text"
                  name="lastName"
                  disabled
                  value={user.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.avatar}>
              <aside className={styles.profileAvatar}>
                <img 
                  src={user.profilePicture || Racoon} 
                  alt="Profile"
                />
                <div 
                  className={`${styles.active} ${user.person_activy  ? styles.online : styles.offline}`}
                >
                  <span>{userStatus.toUpperCase()}</span>
                </div>
              </aside>
            </div>
          </div>            
              
              <div className={styles.bdRisk}><div className={styles.Risk}></div></div>
              <div></div>

              <div className={styles.secondContainer}>
      
                <div className={styles.business}>

              <div className={styles.profileItem}>
                <label>Empresa</label>
                <input
                  type="text"
                  name="company"
                  disabled
                  value={user.company.company}
                  onChange={handleChange}
                /></div>

                <div className={styles.profileItem}>
                  <label>Filial</label>
                  <input
                    type="text"
                    name="branch"
                    value={user.company.branch}
                    disabled
                    onChange={handleChange}
                  /></div>

                <div className={styles.profileItem}>
                  <label>Departamento</label>
                  <input
                    type="text"
                    name="department"
                    value={user.company.departament.name}
                    disabled
                    onChange={handleChange}
                  /></div>

                    <div className={styles.profileItem}>
                      <label>Categoria</label>
                      <input
                        type="text"
                        name="category"
                        value={user.category}
                        disabled
                        onChange={handleChange}
                      /></div>

</div>

              <div className={styles.information}>
              <div className={styles.profileItem}>
                <label>Cargo</label>
                <input
                  type="text"
                  name="position"
                  disabled
                  value={user.office}
                  onChange={handleChange}
                /></div>


              <div className={styles.profileItem}>
                <label>E-mail</label>
                <input
                  type="email"
                  disabled
                  name="email"
                  value={user.user.email}
                  onChange={handleChange}
                />
              </div>
              
              
              <div className={styles.profileItem}>
                <label>Telefone</label>
                <InputMask
              mask="(99) 99999-9999"
              type="tel"
              disabled
              name="phone"
              value={user.telephone}
              onChange={handleChange}
            /></div>

              <div className={styles.actions}>
                <NavLink to={`/usuario/editar-usuario`} >
                  <button id={styles.first} onClick={handleEdit}>EDITAR</button>
                </NavLink>
    
                <NavLink to={`/usuario/redefinir-senha`}>
                  <button id={styles.last} onClick={handleResetPassword}>REDEFINIR SENHA</button>
                </NavLink>
              </div>
</div>
              </div>

              </div>
    
            </div>
          
        </ContainerUser>
      );
    }

    export default Usuario