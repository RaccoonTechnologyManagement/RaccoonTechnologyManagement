import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import styles from './EditarAtivoServ.module.css';
import iconeExcluir from '../../../img/excluir.png'; 
import Container from '../../layout/Container';
import { useEffect, useRef, useState } from 'react';

function EditarAtivoServ () {
  const chatRef = useRef();
  const [novaMensagem, setNovaMensagem] = useState('');


  const [asset, setAsset] = useState({});
  const id_asset = localStorage.getItem('idAsset');

  

  const navigate = useNavigate();

  
    const handleChange = (e) => {
      const { name, value } = e.target;
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
          <h2>ATIVO #<span>MESS2</span></h2>
        </div>
        <form action="#" className={styles.formActive}>
          <div className={styles.activeInputs}>
            <label className={styles.title}>MONITORAR</label>
            <select name="monitorar">
              <option value="1">SIM</option>
              <option value="2">NÃO</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>STATUS</label>
            <select name="status">
              <option value="1">Armazenado</option>
              <option value="2">Manutenção</option>
              <option value="3">Em uso</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>CATEGORIA</label>
            <select name="categoria">
              <option value="1">AD</option>
              <option value="2">Cloud</option>
              <option value="3">Aplicação</option>
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
            <label className={styles.title}>NOME</label>
            <input 
              type="text"
              name="nome"
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>HOST</label>
            <input 
              type="text"
              name="host"
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>PORTA</label>
            <input 
              type="text"
              name="porta"
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
            <label className={styles.title}>LOCALIZAÇÃO</label>
            <input 
              type="text"
              name="localização"
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
          <div className={styles.assetFormGroupFullWidth}>
            <label htmlFor="anotacao">ANOTAÇÃO</label>
            <textarea name="anotacao" rows="5" className={styles.fullWidth} value="TESTE" disabled></textarea>
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

export default EditarAtivoServ