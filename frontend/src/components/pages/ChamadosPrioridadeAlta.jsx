import { IoMdArrowRoundBack } from "react-icons/io"
import { IoMdArrowRoundForward } from "react-icons/io";
import styles from '../pages/ChamadosAbertos.module.css'
import editar from '../../img/editar.png'
import { tickets } from '../data/ChamadosDataBase'
import Chamados from '../layout/Chamados'
import { useState } from 'react'
import {InfoSearch} from '../component/Search'

function ChamadosPrioridadeAlta(){
  const cabecalho = [
    'ID','Título','Categoria','Prioridade','Empresa','Técnico',''
  ]
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [search, setSearch] = useState("")

  const verificarSearch = tickets 
  .filter((item) =>{
    return Object.values(item)
    .some((prop) => prop && prop
    .toString().toLowerCase()
    .includes(search.toLowerCase()));
  })

  const filteredItems = verificarSearch.filter((item) => item.prioridade === 'Alta');
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return(
    <Chamados>
      <InfoSearch setSearch={setSearch} />  
      <table className={styles.Tabela}>
        <thead>
          <tr className={styles.tabelaCabecalho}>
            {cabecalho.map((item, index)=>(
              <th key={index} className={styles.tabelaCabecalhoItens}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody >
          {filteredItems.length > 0 ? filteredItems
          .slice(startIndex, endIndex).map((item,index) =>(
            <tr key={index} >
              <td className={styles.tabelaCabecalhoItens}>{item.id}</td>
              <td className={styles.tabelaCabecalhoItens}>{item.titulo}</td>
              <td className={styles.tabelaCabecalhoItens}>{item.categoria}</td>
              <td className={styles.prioridade}>
                {item.prioridade === 'Alta'? 
                <div className={styles.prioridadeAlta}>Alta</div>: ''}
              </td>
              <td className={styles.tabelaCabecalhoItens}>{item.empresa}</td>
              <td className={styles.tabelaCabecalhoItens}>{item.tecnico}</td>
              <td className={styles.tabelaCabecalhoItens}>
                <img 
                alt="Editar"
                src={editar}/>
              </td>
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
    )
}

export default ChamadosPrioridadeAlta

