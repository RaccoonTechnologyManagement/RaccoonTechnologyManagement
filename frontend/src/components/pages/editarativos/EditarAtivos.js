import axios from 'axios';
import iconeExcluir from '../../../img/excluir.png'; 
import { useNavigate} from 'react-router-dom';
import styles from './EditarAtivos.module.css';
import Container from '../../layout/Container';
import { useEffect, useRef, useState } from 'react';


function EditarAtivos () {
    const chatRef = useRef();
    const [novaMensagem, setNovaMensagem] = useState('');
  
    const [ticket, setTicket] = useState({
        id: 'CR7',
        categoria: 'Sigma Saúde e Bem-Estar Ltda',
        patrimonio: '1',
        marca: 'DELL',
        modelo:'F4000',
        nserie:'2546ghj6',
        ipv4: '192.168.2.10',
        user: 'asd.dummont',
        ipv6:'Hardware',
        macrede: '24/07/2024',
        status: 'Em uso',
        empresa: 'Raccon',
        macwifi: 'Em andamento',
        anotação: 'Ativo criado em 08/2024'
    })
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket({ ...ticket, [name]: value });
      };
    
    const [mensagens, setMensagens] = useState([
      {
        logged: false,
        usuario: 'asd.dumontt',
        texto: 'Olá! Estou enfrentando problemas para acessar o sistema.',
      }
    ]);
  
    const userLogged = 'gui.araujo' //puxar do login
    const handleEnviarMensagem = () => {
      if (novaMensagem.trim() === '') return; // Ignora mensagens vazias
  
      const novaMensagemObj = {
        logged: true,
        usuario: userLogged, // usuário logado
        texto: novaMensagem,
      };
  
      setMensagens([...mensagens, novaMensagemObj]); // Atualiza o estado com a nova mensagem
      setNovaMensagem(''); // Limpa o input
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };
  
  
    return(
      <Container>
      <div className={styles.mainContainerCenter}>
        <div className={styles.containerCenter}>
          <div className={styles.activeNumber}>
            <h2>ATIVO #<span>{ticket.id}</span></h2>
          </div>
          <form action="#" className={styles.formActive}>
            <div className={styles.activeInputs}>
              <label className={styles.title}>STATUS</label>
              <select name="status">
                <option value="1">Aberto</option>
                <option value="2">Em andamento</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>CATEGORIA</label>
              <select name="categoria">
                <option value="1">Desktop</option>
                <option value="2">Notebook</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>Nº PATRIMONIO</label>
              <input 
                type="text"
                name="patrimonio"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MARCA</label>
              <input 
                type="text"
                name="marca"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MODELO</label>
              <input 
                type="text"
                name="modelo"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>NUMERO DE SERIE</label>
              <input 
                type="text"
                name="nserie"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>IPV4</label>
              <input 
                type="text"
                name="ipv4"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>IPV6</label>
              <input 
                type="text"
                name="ipv6"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MAC REDE</label>
              <input 
                type="text"
                name="macrede"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>EMPRESA</label>
              <select name="empresa" onChange={handleChange}>
                <option value="">Raccoon</option>
                <option value="1">Skylab</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MAC WIFI</label>
              <input 
                type="text"
                name="macwifi"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>SEDE</label>
              <select name="sede" onChange={handleChange}>
                <option value="">Sede São Paulo</option>
                <option value="1">Sede Rio de Janeiro</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>LOCALIZAÇÃO</label>
              <input 
                type="text"
                name="localização"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>USUARIO</label>
              <select name="user" onChange={handleChange}>
                <option value="">ryan.hyggor</option>
                <option value="1">alberto.dumontt</option>
              </select>
            </div>
            <div className={styles.assetFormGroupFullWidth}>
              <label htmlFor="anotacao">ANOTAÇÃO</label>
              <textarea name="anotacao" rows="5" className={styles.fullWidth} value={ticket.anotation} disabled></textarea>
            </div>
          </form>
          <div className={styles.buttonGroup}>
            <div className={styles.boxLeftButtonGroup}>
              <button 
                className={styles.createButton}
                >FINALIZAR</button>
              <img
                className={styles.deleteButton}
                src={iconeExcluir}>
              </img>
            </div>
            <div className={styles.boxRightButtonGroup}>
              <button 
                className={styles.saveButton}
                >SALVAR</button>
              <button className={styles.cancelButton}>CANCELAR</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
      )
}

export default EditarAtivos