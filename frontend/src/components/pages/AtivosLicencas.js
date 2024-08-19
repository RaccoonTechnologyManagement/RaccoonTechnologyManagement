import { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoMdArrowRoundForward } from "react-icons/io";
import styles from '../pages/AtivosAbertos.module.css'
import editar from '../../img/editar.png'
import { licencas } from '../data/LicencasDatabase';
import {InfoSearch} from '../component/Search'
import AtivosLt from '../layout/AtivosLt';
import AtivosLicencasDois from './AtivosLicencasDois';

function AtivosInicial (){

    const cabecalho = [
        'N° Pat','Software','Departamento','Empresa','Sede','Status','LT','LR',
      ]
      const itemsPerPage = 4;
      const totalPages = Math.ceil(licencas.length / itemsPerPage);
      const [currentPage, setCurrentPage] = useState(1);
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
    
      const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
      };
      const [search, setSearch] = useState("")
    
      const verificarSearch = licencas 
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
                  <td className={styles.tabelaCabecalhoItens}>{item.id}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.nome}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.setor}</td>                                 
                  <td className={styles.tabelaCabecalhoItensEmpresa}>{item.empresa}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.sede}</td>
                  <td className={styles.status}>
                    {item.status === 'Ativo'? 
                    <div className={styles.userativo}>Ativo</div>: ''}
                    {item.status === 'Inativo'? 
                    <div className={styles.userinativo}>Inativo</div>: ''}
                  </td>

                  <td className={styles.licencas}>
                    {item.lict === '10'?
                    <div className={styles.totallicencas}>10</div>: ''}   
                  </td>

                  <td className={styles.licencas}>
                    {item.licr === '07'? 
                    <div className={styles.totallicencas}>07</div>: ''}
                  </td>

                  

                  <td className={styles.tabelaCabecalhoItens}>
                    <img 
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
          <div className={styles.pages}>
        <button onClick={() => handlePageChange(currentPage - 1)}><IoMdArrowRoundBack/></button>
        <span>Página {currentPage} de {totalPages}</span><button 
        onClick={() => handlePageChange(currentPage + 1)}disabled={currentPage === totalPages}><IoMdArrowRoundForward/>
        </button>
        </div>
        <div>
          <AtivosLicencasDois/>
        </div>
        </AtivosLt>

        

        
        )
    }
    

export default AtivosInicial