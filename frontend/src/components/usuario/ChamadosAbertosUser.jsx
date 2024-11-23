import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import styles from './ChamadosAbertos.module.css';
import ChamadosUser from './ChamadosUser';
import { useState, useEffect } from 'react';
import { InfoSearch } from '../component/Search';
import { getTickets } from '../data/api';

async function carregarTickets() {
  try {
    let tickets = await getTickets(1);
    return tickets;
  } catch (erro) {
    return [];
  }
}

function ChamadosAbertosUser() {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsData = await carregarTickets();
      setTickets(ticketsData);
    };
    fetchTickets();
  }, []);

  const cabecalho = ['ID', 'Título', 'Categoria', 'Prioridade', 'Empresa', 'Técnico'];

  const itemsPerPage = 10;

  const verificarSearch = tickets.filter((item) => {
    return Object.values(item)
      .some((prop) => prop && prop.toString().toLowerCase().includes(search.toLowerCase()));
  });

  const totalPages = Math.ceil(verificarSearch.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <ChamadosUser>
      <InfoSearch setSearch={setSearch} />
      <table className={styles.Tabela}>
        <thead>
          <tr className={styles.tabelaCabecalho}>
            {cabecalho.map((item, index) => (
              <th key={index} className={styles.tabelaCabecalhoItens}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {verificarSearch.length > 0 ? verificarSearch
            .slice(startIndex, endIndex).map((item, index) => (
              <tr key={index}>
                <td className={styles.tabelaCabecalhoItens}>{item.id}</td>
                <td className={styles.tabelaCabecalhoItens}>{item.title}</td>
                <td className={styles.tabelaCabecalhoItens}>{item.category}</td>
                <td className={styles.tabelaCabecalhoItens}>
                  {item.priority === 'Alta' ? <div className={styles.prioridadeAlta}>Alta</div> : ''}
                  {item.priority === 'Média' ? <div className={styles.prioridadeMedia}>Média</div> : ''}
                  {item.priority === 'Baixa' ? <div className={styles.prioridadeBaixa}>Baixa</div> : ''}
                </td>
                <td className={styles.tabelaCabecalhoItens}>{item.company.company}</td>
                <td className={styles.tabelaCabecalhoItens}>{item.accountable}</td>
              </tr>
            ))
            :
            <tr>
              <td colSpan="7">
                <h3>Nenhum resultado para '{search}'</h3>
              </td>
            </tr>
          }
        </tbody>
      </table>
      {verificarSearch.length > 0 && (
        <div className={styles.pages}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><IoMdArrowRoundBack /></button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoMdArrowRoundForward />
          </button>
        </div>
      )}
    </ChamadosUser>
  );
}

export default ChamadosAbertosUser;