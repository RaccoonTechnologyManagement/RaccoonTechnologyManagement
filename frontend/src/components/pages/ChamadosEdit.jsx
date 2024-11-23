import axios from 'axios';
import { getComments, insertComments, updateTicket, getInfoTicket, getPersonsTechnical, getInfoPerson } from '../data/api'
import styles from '../pages/ChamadosEdit.module.css'
import Container from '../layout/Container'
import { useEffect, useRef, useState } from 'react';
import iconeInput from '../../img/enviar-mensagem.png';
import iconeExcluir from '../../img/excluir.png';
import { useNavigate} from 'react-router-dom';


function ChamadosEdit(){
  const chatRef = useRef();

  const scrollBelow = () => {
    if(chatRef.current)
    {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      scrollBelow();
    }, 50);
  }, []);

  const [novaMensagem, setNovaMensagem] = useState('');
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);

  const [ticket, setTicket] = useState({});

  const navigate = useNavigate();

  const id_ticket = localStorage.getItem('idTicket');

  async function inserirComentarios(data)
  {
    try
    {
        insertComments(data);
    }
    catch(erro)
    {
        return [];
    }
  }

  async function carregarInfoPessoa()
  {
    try
    {
        let person = await getInfoPerson();

        return person;
    }
    catch(erro)
    {
        return [];
    }
  }

  async function carregarTecnicos(data)
  {
    try
    {
      let tecnicos = await getPersonsTechnical(data);
      return tecnicos;
    }
    catch(erro)
    {
        return [];
    }
  }

  async function carregarTicket()
  {
    try
    {
        let ticket = await getInfoTicket(id_ticket);
        return ticket;
    }
    catch(erro)
    {
        return [];
    }
  }

  async function carregarComentarios()
  {
    try
    {
        let comments = await getComments(id_ticket);
        let commentsFormated = await formataComentariosCarregadas(comments);

        return commentsFormated;
    }
    catch(erro)
    {
        return [];
    }
  }

  async function formataComentariosCarregadas(messagens)
  {
    try
    {
        let mensagensFormatadas = messagens.map(mensagem => 
        {
          return {
            logged: validaUsuarioLogado(mensagem.id_person, pessoaLogada.id),
            usuario: mensagem.person.name,
            texto: mensagem.comment
          };
        });

        return mensagensFormatadas;
    }
    catch(erro)
    {
      return [];
    }
  }

  function validaUsuarioLogado(idUserMessagem, idUserLogged)
  {
    if(idUserMessagem === idUserLogged)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  async function atualizarChamado(status)
  {
    try
    {
      let data = {};

      if(status == 4)
      {
        data = {
          id_ticket: id_ticket,
          id_status: status
        }
      }
      else
      {
        data = {
          id_ticket: id_ticket,
          id_status: status,
          id_person_accountable: document.getElementById('tecnico').value,
          id_priority: ticket.priority,
          id_category: ticket.category,
          dateExp: document.getElementById('dataPrazo').value ? document.getElementById('dataPrazo').value : "2000-12-31"
        }
      }

      let ticketAtualizado = await updateTicket(data);

      setTimeout(() => {
        navigate('/chamados/abertos');
      }, 50);
    }
    catch(erro)
    {

    }
  }

  
  const formatDateToISO = (dateStr) => {
    if(dateStr != '')
    {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    }
    else
    {
      return '';
    }
  };

  function DateInputComponent({ ticket }) {
    const [selectedDate, setSelectedDate] = useState(formatDateToISO(ticket.dateExp));

    useEffect(() => {
        setSelectedDate(formatDateToISO(ticket.dateExp));
    }, [ticket.dateExp]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className={styles.ticketInputs}>
            <label className={styles.title}>DATA PRAZO</label>
            <input
                id="dataPrazo" 
                type="date"
                name="dataprazo"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </div>
    );
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const [mensagens, setMensagens] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [pessoaLogada, setPessoaLogada] = useState([]);

  useEffect(() => {
    const inserirInformacoesTicket = async () => {
      const tecnicos = await carregarTecnicos(1);
      const pessoa = await carregarInfoPessoa();
      setPessoaLogada(pessoa);
      setTecnicos(tecnicos);
      const info = await carregarTicket();
      setTicket(info);

      const comentarios = await carregarComentarios();
      if (comentarios.length > 0) {
        setMensagens(comentarios);
        scrollBelow();
      }
      
      setIsLoading(false);
    };

    inserirInformacoesTicket();
  }, []);


  const handleEnviarMensagem = () => {
    if (novaMensagem.trim() === '') return;

    const novoComentario = {
      logged: true,
      usuario: pessoaLogada.name,
      texto: novaMensagem,
    };

    const data = {
      id_ticket: id_ticket,
      comment: novaMensagem
    }

    inserirComentarios(data);

    setMensagens([...mensagens, novoComentario]);
    setNovaMensagem('');
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const handleCancel = () => {
    navigate("/chamados/meus-chamados"); // Redireciona para a página desejada
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
                value={ticket.title}
                onChange={handleChange}
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>STATUS</label>
              <select name="status" onChange={handleChange} value={ticket.status || ''}>
                <option value="1">Aberto</option>
                <option value="2">Em andamento</option>
              </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>EMPRESA</label>
              <input 
                type="text"
                name="empresa"
                value={ticket.company.company}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>TÉCNICO</label>
              <select id="tecnico">
              <option value={ticket.persons.accountable.id}>
                {ticket.persons.accountable.id === 1 ? "Sem Técnico" : ticket.persons.accountable.name}
            </option>
                {tecnicos
                  .filter(tecnico => tecnico.id_person !== ticket.persons.accountable.id)
                  .map((tecnico) => (
                    <option key={tecnico.id_person} value={tecnico.id_person}>
                        {tecnico.name}
                    </option>
                ))}
              <option value="1">Sem técnico</option>
            </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>DEPARTAMENTO</label>
              <input 
                type="text"
                name="departamento"
                value={ticket.company.departament}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>SEDE</label>
              <input 
                type="text"
                name="sede"
                value={ticket.company.branch}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>USUÁRIO</label>
              <input 
                type="text"
                name="user"
                value={ticket.persons.creator.name}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>PRIORIDADE</label>
              <select name="prioridade" onChange={handleChange} value={ticket.priority || ''}>
                <option value="1">Baixa</option>
                <option value="2">Média</option>
                <option value="3">Alta</option>
              </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>CATEGORIA</label>
              <select name="categoria" onChange={handleChange} value={ticket.category || ''}>
                <option value="">Selecione</option>
                <option value="1">Hardware</option>
                <option value="2">Rede</option>
                <option value="3">Servidor</option>
                <option value="4">Software</option>
              </select>
            </div>
            <div className={styles.ticketInputs}>
              <label className={styles.title}>DATA DE CRIAÇÃO</label>
              <input 
                type="date"
                name="data"
                value={formatDateToISO(ticket.dateCreated)}
                onChange={handleChange}
                disabled
              />
            </div>
            <DateInputComponent ticket={ticket} />
            
            <div className={styles.assetFormGroupFullWidth}>
              <label htmlFor="descricao">DESCRIÇÃO</label>
              <textarea name="descricao" rows="5" className={styles.fullWidth} value={ticket.description} disabled></textarea>
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
              <button 
                className={styles.createButton}
                onClick={() => {
                  atualizarChamado(3)
                }}
                >FINALIZAR</button>
              <img
                className={styles.deleteButton}
                onClick={() => {
                  atualizarChamado(4)
                }}
                src={iconeExcluir}>
              </img>
            </div>
            <div className={styles.boxRightButtonGroup}>
              <button 
                className={styles.saveButton}
                onClick={() => {
                  atualizarChamado(ticket.status)
                }
                }>SALVAR</button>
              <button className={styles.cancelButton} onClick={handleCancel}>CANCELAR</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
    )
}

export default ChamadosEdit