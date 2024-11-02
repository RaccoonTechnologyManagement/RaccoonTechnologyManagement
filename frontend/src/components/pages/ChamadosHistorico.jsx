import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import styles from '../pages/ChamadosHistorico.module.css';
import editar from '../../img/editar.png';
import Chamados from '../layout/Chamados';
import { useState, useEffect } from 'react';
import { InfoSearch } from '../component/Search';
import { getTickets } from '../data/api';
import RedirectButton from "../component/RedirectButton";

async function carregarTickets() {
  try {
    let tickets = await getTickets();
    return tickets;
  } catch (erro) {
    return [];
  }
}

function ChamadosHistorico() {
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

  const cabecalho = ['ID', 'Título', 'Categoria', 'Prioridade', 'Empresa', 'Técnico', ''];

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
    <Chamados>
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
                <RedirectButton
                  item={item} 
                  url="/chamados/edit"
                  className={styles.tabelaCabecalhoItens}
                  imageSrc={editar} 
                  altText="Editar" 
                />
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
    </Chamados>
  );
}

export default ChamadosHistorico;
