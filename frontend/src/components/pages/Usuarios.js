import Container from '../layout/Container'
import {useState} from 'react'
import Racoon from '../../img/RACOON.svg'
import styles from '../pages/Usuarios.css'


function Usuarios(){

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
    

    return(
        <Container>
           <div className="profile-container">
      <h1>Meu Perfil</h1>
      <div className="profile-header">
        <div className="input-group">
          <label>Usuário</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Nome</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Sobrenome</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        </div>
        <div className="profile-status">
          <img src={Racoon} alt="Profile" />
          <span className="status-active">ATIVO</span>
        </div>
      </div>
      <div className="profile-details">
        <div className="input-group">
          <label>Empresa</label>
          <input type="text" name="company" value={user.company} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Cargo</label>
          <input type="text" name="position" value={user.position} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Filial</label>
          <input type="text" name="branch" value={user.branch} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>E-mail</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Departamento</label>
          <input type="text" name="department" value={user.department} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Telefone</label>
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Categoria</label>
          <input type="text" name="category" value={user.category} onChange={handleChange} />
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleResetPassword}>Redefinir Senha</button>
      </div>
    </div>
            

        </Container>
    )
}

export default Usuarios