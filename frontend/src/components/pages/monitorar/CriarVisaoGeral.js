import { getServerAssetMonitoring } from '../../data/api'
import { useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoMdArrowRoundForward } from "react-icons/io";
import { monitorar } from '../../data/MonitorarDatabase';
import { InfoSearch } from '../../component/Search';
import styles from '../monitorar/CriarVisaoGeral.module.css'


function CriarVisaoGeral () {

  const cabecalho = ['Patrimônio', 'Nome', 'Host', 'Empresa', 'Sede', 'Status', 'Alerta'];
  const itemsPerPage = 15;
  const totalPages = Math.ceil(monitorar.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  async function carregarServidoresMonitorados()
  {
    try
    {
      return getServerAssetMonitoring();
    }
    catch(erro)
    {
        return [];
    }
  }

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const data = await carregarServidoresMonitorados();
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

  const [search, setSearch] = useState("")

  const verificarSearch = assets.filter((item) => {
    // Verifica se a pesquisa é relacionada ao status 'online' ou 'offline' de forma mais flexível
    const statusSearch = search.toLowerCase();
    
    // Verifica se o status é "online" ou "offline"
    if (statusSearch.includes('online') && item.status === 1) {
      return true;
    }
    if (statusSearch.includes('offline') && item.status === 0) {
      return true;
    }
  
    // Filtro genérico para outros campos
    return Object.values(item)
      .some((prop) => 
        prop && prop.toString().toLowerCase().includes(statusSearch)
      );
  });
  
  

  // Contagem de dispositivos ONLINE e OFFLINE
  const dispositivosOnline = assets.filter((item) => item.status === 1).length;
  const dispositivosOffline = assets.filter((item) => item.status === 0).length;

  // Total de dispositivos
  const totalDispositivos = assets.length;

    return (
      <>
         <div className={styles.tituloContainer}>
        {/* Seção de Dispositivos Online */}
        <div className={styles.tituloDivOnline}>
          <h1 className={styles.titulo}>DISPOSITIVOS ONLINE:</h1>
          <span className={styles.quantidadeFundoOnline}>{dispositivosOnline} / {totalDispositivos}</span>
        </div>

        {/* Seção de Dispositivos Offline */}
        <div className={styles.tituloDivOffline}>
          <h1 className={styles.titulo}>DISPOSITIVOS OFFLINE:</h1>
          <span className={styles.quantidadeFundoOffline}>{dispositivosOffline} / {totalDispositivos}</span>
        </div>
      </div>
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
                  <td className={styles.tabelaCabecalhoItens}>{item.name}</td>
                  <td className={styles.tabelaCabecalhoItens}>{item.host}</td>                
                  <td className={styles.tabelaCabecalhoItens}>{item.company.company}</td>                  
                  <td className={styles.tabelaCabecalhoItens}>{item.company.branch}</td>
                  <td className={styles.status}>
                    {item.status === 1 ? 
                    <div className={styles.useronline}>Online</div>: ''}
                    {item.status === 0 ? 
                    <div className={styles.useroffline}>Offline</div>: ''}
                  </td>
                  <td className={styles.tabelaCabecalhoItens}>{item.alert}</td>
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