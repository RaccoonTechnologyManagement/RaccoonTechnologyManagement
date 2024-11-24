import { useState } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import styles from '../pages/Usuarios.module.css';
import { InfoSearch } from '../component/Search';
import UsuariosLt from '../layout/UsuariosLt';
import UsuariosDois from './UsuariosDois';
import { avisos } from '../data/AvisosDatabase';

function Usuarios() {
    const cabecalho = [
        'Título', 'Prioridade', 'Para', 'Tipo', 'Expira'];
    const itemsPerPage = 2;
    const totalPages = Math.ceil(avisos.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const [search, setSearch] = useState("");

    const verificarSearch = avisos.filter((item) => {
        return Object.values(item)
            .some((prop) => prop && prop.toString().toLowerCase().includes(search.toLowerCase()));
    });

    return (
        <UsuariosLt>
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
                  <td className={styles.tabelaCabecalhoItens}>{item.titulo}</td>
                  <td className={styles.status}>
                    {item.prioridade === 'Alta'? 
                    <div className={styles.prioridadealta}>Alta</div>: ''}
                    {item.prioridade === 'Media'? 
                    <div className={styles.prioridademedia}>Media</div>: ''}
                    {item.prioridade === 'Baixa'? 
                    <div className={styles.prioridadebaixa}>Baixa</div>: ''}
                  </td>
                  <td className={styles.tabelaCabecalhoItens}>{item.para}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.tipo}</td>                                 
                  <td className={styles.tabelaCabecalhoItensEmpresa}>{item.expira}</td>
                  

                  <td className={styles.licencas}>
                    {item.lict === '10'?
                    <div className={styles.totallicencas}>10</div>: ''}   
                  </td>

                  <td className={styles.licencas}>
                    {item.licr === '07'? 
                    <div className={styles.totallicencas}>07</div>: ''}
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
          <div className={styles.pages}>
        <button onClick={() => handlePageChange(currentPage - 1)}><IoMdArrowRoundBack/></button>
        <span>Página {currentPage} de {totalPages}</span><button 
        onClick={() => handlePageChange(currentPage + 1)}disabled={currentPage === totalPages}><IoMdArrowRoundForward/>
        </button>
        </div>
        <div>
                <UsuariosDois/>
            </div>
        </UsuariosLt>
    );
}

export default Usuarios;
