import React, { useState } from "react";
import Container from "../layout/Container";
import Racoon from "../../img/RACOON.svg";
import styles from "../pages/User.module.css";
import { NavLink } from "react-router-dom";

function User(){
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
                <div className={styles.profileItem}>
                  <label>Usuário</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.profileItem}>
                  <label>Nome</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.profileItem}>
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
                <span >ATIVO</span>
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
                  value={user.company}
                  onChange={handleChange}
                /></div>

                <div className={styles.profileItem}>
                  <label>Filial</label>
                  <input
                    type="text"
                    name="branch"
                    value={user.branch}
                    onChange={handleChange}
                  /></div>

                <div className={styles.profileItem}>
                  <label>Departamento</label>
                  <input
                    type="text"
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                  /></div>

                    <div className={styles.profileItem}>
                      <label>Categoria</label>
                      <input
                        type="text"
                        name="category"
                        value={user.category}
                        onChange={handleChange}
                      /></div>

</div>

              <div className={styles.information}>
              <div className={styles.profileItem}>
                <label>Cargo</label>
                <input
                  type="text"
                  name="position"
                  value={user.position}
                  onChange={handleChange}
                /></div>


              <div className={styles.profileItem}>
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              
              
              <div className={styles.profileItem}>
                <label>Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                /></div>

              <div className={styles.actions}>
                <NavLink to={`/editar-usuario`}>
                  <button id={styles.first} onClick={handleEdit}>EDITAR</button>
                </NavLink>
    
                <NavLink to={`/redefinir-senha`}>
                  <button id={styles.last} onClick={handleResetPassword}>REDEFINIR SENHA</button>
                </NavLink>
              </div>
</div>
              </div>

              </div>
    
            </div>
          
        </Container>
      );
    }
    
export default User