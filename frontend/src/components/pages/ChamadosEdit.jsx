import styles from '../pages/ChamadosEdit.module.css'
import Container from '../layout/Container'
import { useEffect, useRef, useState } from 'react';
import iconeInput from '../../img/enviar-mensagem.png'
import iconeExcluir from '../../img/excluir.png'


function ChamadosEdit(){
  const chatRef = useRef();

  const scrollBelow = () => {
    // Rola para baixo automaticamente
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    setTimeout(() => {
      scrollBelow();
    }, 50);
  }, []);

  const [novaMensagem, setNovaMensagem] = useState('');

  const [ticket, setTicket] = useState({
      id: 123,
      titulo: 'Impressora com problema',
      empresa: 'Sigma Saúde e Bem-Estar Ltda',
      departamento: 'Vendas',
      sede:'Filial São Paulo',
      user: 'asd.dummont',
      prioridade:'Alta',
      categoria:'Hardware',
      data: '24/07/2024',
      dataprazo: '26/07/2024',
      status: 'Em andamento',
      descricao: 'Estou enfrentando dificuldades para acessar o sistema da empresa. Já tentei redefinir minha senha, mas o problema persiste.'
  })

  const dataFormatada = parseDate(ticket.data);
  const dataPrazoFormatada = parseDate(ticket.dataprazo);

  function parseDate(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString; // Retorna a data original se o formato estiver incorreto
  }

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
          <div className={styles.ticketNumber}>
            <h2>TICKET #<span>{ticket.id}</span></h2>
          </div>
          <form action="#" className={styles.formTicket}>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>TÍTULO</label>
              <input 
                type="text"
                name="titulo"
                value={ticket.titulo}
                onChange={handleChange}
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>STATUS</label>
              <select name="status">
                <option selected={ticket.status === 'Em andamento'}>Em andamento</option>
                <option selected={ticket.status === 'Encerrado'}>Encerrado</option>
              </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>EMPRESA</label>
              <input 
                type="text"
                name="empresa"
                value={ticket.empresa}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>DEPARTAMENTO</label>
              <input 
                type="text"
                name="departamento"
                value={ticket.departamento}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>SEDE</label>
              <input 
                type="text"
                name="sede"
                value={ticket.sede}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>USUÁRIO</label>
              <input 
                type="text"
                name="user"
                value={ticket.user}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>PRIORIDADE</label>
              <select name="prioridade">
                <option selected={ticket.status === 'Alta'}>Alta</option>
                <option selected={ticket.status === 'Média'}>Média</option>
                <option selected={ticket.status === 'Baixa'}>Baixa</option>
              </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>CATEGORIA</label>
              <select name="categoria">
                <option selected={ticket.status === 'Hardware'}>Hardware</option>
                <option selected={ticket.status === 'Software'}>Software</option>
                <option selected={ticket.status === 'Office 365'}>Office 365</option>
              </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>DATA DE CRIAÇÃO</label>
              <input 
                type="date"
                name="data"
                value={dataFormatada}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>DATA PRAZO</label>
              <input 
                type="date"
                name="dataprazo"
                value={dataPrazoFormatada}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.assetFormGroupFullWidth}>
              <label htmlFor="descricao">DESCRIÇÃO</label>
              <textarea name="descricao" rows="5" className={styles.fullWidth} value={ticket.descricao} disabled></textarea>
            </div>
          </form>

          <h2 className={styles.title}>COMENTÁRIOS</h2>
          <div className={styles.chat} ref={chatRef}>
            <div className={styles.messageBox}>
            {mensagens.map((mensagem, index) => (
              mensagem.logged ? 
                <div key={index} className={styles.messageBoxLogged}>
                  <div className={styles.userLogged}>
                    <span>{mensagem.usuario}</span>
                  </div>
                  <div className={styles.messageLogged}>
                    {mensagem.texto}
                  </div>
                </div>
                :
                <div key={index} className={styles.messageBox}>
                  <div className={styles.user}>
                    <span>{mensagem.usuario}</span>
                  </div>
                  <div className={styles.message}>
                    {mensagem.texto}
                  </div>
                </div>
              
            ))}
            </div>
          </div>

          <div className={styles.containerInput}>
              <input 
              type="text" 
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              placeholder="Digite sua mensagem"
              />
              <img
                src={iconeInput}
                onClick={handleEnviarMensagem}>
              </img>
          </div>
          <div className={styles.buttonGroup}>
            <div className={styles.boxLeftButtonGroup}>
              <button className={styles.createButton}>FINALIZAR</button>
              <img
                className={styles.deleteButton}
                src={iconeExcluir}>
              </img>
            </div>
            <div className={styles.boxRightButtonGroup}>
              <button className={styles.saveButton}>SALVAR</button>
              <button className={styles.cancelButton}>CANCELAR</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
    )
}

export default ChamadosEdit

