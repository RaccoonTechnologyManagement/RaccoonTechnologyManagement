import { getAssetHardware } from '../data/api';
import { useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoMdArrowRoundForward } from "react-icons/io";
import styles from '../pages/AtivosAbertos.module.css'
import editar from '../../img/editar.png'
import { ativos } from '../data/AtivosDatabase'
import {InfoSearch} from '../component/Search'
import AtivosLt from '../layout/AtivosLt';

function AtivosHardware (){

    const cabecalho = [
        'Patrimônio', 'Categoria', 'Marca', 'Modelo', 'Empresa', 'Sede', 'Status', ''];
      const itemsPerPage = 25;
      const totalPages = Math.ceil(ativos.length / itemsPerPage);
      const [currentPage, setCurrentPage] = useState(1);
    
      async function carregarAtivosHardware()
      {
        try
        {
          return getAssetHardware();
        }
        catch(erro)
        {
            return [];
        }
      }

      const [assets, setAssets] = useState([]);
    
      useEffect(() => {
        const fetchAssets = async () => {
          const data = await carregarAtivosHardware();
          setAssets(data);
        };
        fetchAssets();
      }, []);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
    
      const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
      };
      const [search, setSearch] = useState("");
    
      const verificarSearch = assets 
      .filter((item) =>{
        return Object.values(item)
        .some((prop) => prop && prop
        .toString().toLowerCase()
        .includes(search.toLowerCase()));
      })
    
      return(
        <AtivosLt>
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
                  <td className={styles.tabelaCabecalhoItens}>{item.patrimony_number}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.category}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.brand}</td>                
                  <td className={styles.tabelaCabecalhoItens}>{item.model}</td>                  
                  <td className={styles.tabelaCabecalhoItensEmpresa}>{item.company.company}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.company.branch}</td>

                  <td className={styles.status}>
                    {item.status === 'Em uso'? 
                    <div className={styles.ativoEmUso}>{item.status}</div>: ''}
                    {item.status === 'Em manutenção'? 
                    <div className={styles.ativoManutencao}>Manutenção</div>: ''}
                    {item.status === 'Armazenado'? 
                    <div className={styles.ativoAramazenado}>{item.status}</div>: ''}
                  </td>
                  <td className={styles.tabelaCabecalhoItens}>
                  <img 
                    src={editar} 
                    alt="Editar" 
                    onClick={() => {
                      localStorage.setItem('patrimonyNumberHardware', item.patrimony_number);
                      window.location.href = '/ativos/hardware/edit';
                    }} 
                  />
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

        </AtivosLt>
        )
    }
    

export default AtivosHardware