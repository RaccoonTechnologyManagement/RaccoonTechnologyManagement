import React, { useState } from 'react';
import Container from '../layout/Container';
import Racoon from '../../img/RACOON.svg';
import padlock from '../../img/padlock.svg';
import styles from '../pages/Usuarios.module.css';
import { NavLink } from 'react-router-dom';

function EditarUsuarios() {
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    company: '',
    branch: '',
    department: '',
    category: '',
    position: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEdit = () => {
    // Lógica para editar
    console.log('Botão Editar clicado');
  };

  const handleResetPassword = () => {
    // Lógica para redefinir senha
    console.log('Botão Redefinir Senha clicado');
  };

  const renderInput = (name, label, readOnly = false) => (
    <div className={styles.profileItem}>
      <label>{label}</label>
      <div className={styles.inputContainer}>
        <input 
          type={name === 'email' ? 'email' : 'text'} 
          name={name} 
          value={user[name]} 
          onChange={handleChange} 
          readOnly={readOnly}
        />
        {readOnly && <img src={padlock} alt="Lock Icon" className={styles.lockIcon} />}
      </div>
    </div>
  );

  return (
    <Container>
      <div className={styles.profileContainer}>
        <h1>Meu Perfil</h1>
        <div className={styles.profileGrid}>
          <div className={styles.profile}>
            {renderInput('username', 'Usuário', true)}
            {renderInput('firstName', 'Nome')}
            {renderInput('lastName', 'Sobrenome')}
          </div>
          <aside className={styles.profileAvatar}>
            <img src={Racoon} alt="Profile" />
            <span className={styles.active}>ATIVO</span>
          </aside>
          {renderInput('company', 'Empresa', true)}
          {renderInput('position', 'Cargo', true)}
          {renderInput('branch', 'Filial', true)}
          {renderInput('email', 'E-mail', true)}
          {renderInput('department', 'Departamento', true)}
          <div className={styles.profileItem}>
            <label>Telefone</label>
            <input 
              type="tel" 
              name="phone" 
              value={user.phone} 
              onChange={handleChange} 
            />
          </div>
          {renderInput('category', 'Categoria', true)}
          <div className={styles.actions}>
            <NavLink to={`/usuarios`}>
              <button onClick={handleEdit}>SALVAR</button>
            </NavLink>
            <NavLink to={`/usuarios`}>
              <button onClick={handleResetPassword}>CANCELAR</button>
            </NavLink>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default EditarUsuarios;
