import styles from '../../pages/ChamadosEdit.module.css'
import Container from '../../layout/Container';
import { useEffect, useRef, useState } from 'react';


function EditarAtivos () {
    const chatRef = useRef();
    const [novaMensagem, setNovaMensagem] = useState('');
  
    const [ticket, setTicket] = useState({
        id: 1,
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
            <div className={styles.ticketNumber}>
              <h2>ATIVO Nº {ticket.id}</h2>
            </div>
  
            <form action="#" className={styles.formTicket}>
              <div className={styles.ticketInputs}>
                <label className={styles.title}>STATUS</label>
                <input 
                  type="text"
                  name="status"
                  value={ticket.status}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.ticketInputsDouble}>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>CATEGORIA</label>
                  <input 
                    type="text"
                    name="categoria"
                    value={ticket.categoria}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>MARCA</label>
                  <input 
                    type="text"
                    name="marca"
                    value={ticket.marca}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.ticketInputsDouble}>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>MODELO</label>
                  <input 
                    type="text"
                    name="modelo"
                    value={ticket.modelo}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>IPV4</label>
                  <input 
                    type="text"
                    name="ipv4"
                    value={ticket.ipv4}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.ticketInputsDouble}>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>N SERIE</label>
                  <input 
                    type="text"
                    name="nserie"
                    value={ticket.nserie}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>IPV6</label>
                  <input 
                    type="text"
                    name="ipv6"
                    value={ticket.ipv6}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.ticketInputsDouble}>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>MAC REDE</label>
                  <input 
                    type="text"
                    name="macrede"
                    value={ticket.macrede}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>EMPRESA</label>
                  <input 
                    type="text"
                    name="empresa"
                    value={ticket.empresa}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.ticketInputsDouble}>
                <div className={styles.ticketInputs}>
                  <label className={styles.title}>STATUS</label>
                  <input 
                    type="text"
                    name="status"
                    value={ticket.status}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.assetFormGroupFullWidth}>
                <label htmlFor="anotação">DESCRIÇÃO</label>
                <textarea name="anotação" rows="5" className={styles.fullWidth} value={ticket.anotação}></textarea>
              </div>
            </form>
  
            
            
              
              
                    
                  
                  
                  
  
            
                {/*<img
                  src={iconeInput}
                  onClick={handleEnviarMensagem}>
                </img>*/}
            </div>
          </div>
        
      </Container>
      )
}

export default EditarAtivos