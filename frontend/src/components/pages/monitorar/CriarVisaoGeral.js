import { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoMdArrowRoundForward } from "react-icons/io";
import { monitorar } from '../../data/MonitorarDatabase';
import { InfoSearch } from '../../component/Search';
import styles from '../monitorar/CriarVisaoGeral.module.css'


function CriarVisaoGeral () {

  const cabecalho = [
    'N° Pat','Nome','Status','IPV4','MAC','Sede','Alerta']
  const itemsPerPage = 15;
  const totalPages = Math.ceil(monitorar.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [search, setSearch] = useState("")

  const verificarSearch = monitorar 
  .filter((item) =>{
    return Object.values(item)
    .some((prop) => prop && prop
    .toString().toLowerCase()
    .includes(search.toLowerCase()));
  })



    return (
      <>
      <h1>Monitoramento</h1>
      <h1>98/100 Dispositivos Online</h1>
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
              {verificarSearch.length > 0 ? verificarSearch
              .slice(startIndex, endIndex).map((item,index) =>(
                <tr key={index}>
                  <td className={styles.tabelaCabecalhoItens}>{item.id}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.nome}</td>
                  <td className={styles.status}>
                    {item.status === 'Online'? 
                    <div className={styles.useronline}>Online</div>: ''}
                    {item.status === 'Offline'? 
                    <div className={styles.useroffline}>Offline</div>: ''}
                  </td>
                  <td className={styles.tabelaCabecalhoItens}>{item.ipv4}</td>                
                  <td className={styles.tabelaCabecalhoItens}>{item.mac}</td>                  
                  <td className={styles.tabelaCabecalhoItens}>{item.departamento}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.alerta}</td>
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
          <div className={styles.pages}>
        <button onClick={() => handlePageChange(currentPage - 1)}><IoMdArrowRoundBack/></button>
        <span>Página {currentPage} de {totalPages}</span>
        <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        >
          <IoMdArrowRoundForward/>
        </button>
      </div>
      </>
      
    )
}

export default CriarVisaoGeral