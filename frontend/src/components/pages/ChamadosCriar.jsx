import styles from '../pages/ChamadosCriar.module.css'
import Container from '../layout/Container'
import { useEffect, useRef, useState } from 'react';

function ChamadosCriar(){

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
      descricao: ''
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



  return(
    <Container>
      <div className={styles.mainContainerCenter}>
        <div className={styles.containerCenter}>
          <div className={styles.ticketNumber}>
            <h2>CRIAR CHAMADO</h2>
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
              <textarea name="descricao" rows="5" className={styles.fullWidth} onChange={handleChange} value={ticket.descricao} ></textarea>
            </div>
            <div className={styles.buttonGroup}>
            <div className={styles.boxRightButtonGroup}>
            <input 
                type="submit"
                name="criar"
                value="CRIAR"
                className={styles.createButton}
              />
              <button className={styles.cancelButton}>CANCELAR</button>
            </div>
          </div>
          </form>

          </div>
          
        </div>
    </Container>
    )
  };

export default ChamadosCriar