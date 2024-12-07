import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import styles from './EditarAtivoServ.module.css';
import iconeExcluir from '../../../img/excluir.png'; 
import Container from '../../layout/Container';
import { useEffect, useRef, useState } from 'react';
import { getInfoServerAsset, getCompanys, getBranchesByCompany, } from '../../data/api'

function EditarAtivoServ () {
  
  const [asset, setAsset] = useState({
    status: "",
    category: "",
    patrimony_number: "",
    brand: "",
    model: "",
    serial_number: "",
    ipv4: "",
    ipv6: "",
    network_mac_address: "",
    mac_address: "",
    location: "",
    person: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = useState(true);
  const patrimonyNumber = localStorage.getItem('patrimonyNumberServer');

  const navigate = useNavigate();

  async function carregarAtivoServer(patrimonyNumber)
  {
    try
    {
        let asset = await getInfoServerAsset(patrimonyNumber);
        return asset;
    }
    catch(erro)
    {
        return [];
    }
  }

  async function carregarEmpresas()
  {
    try
    {
      return getCompanys();
    }
    catch(erro)
    {
        return [];
    }
  }

  async function carregarSede(id_company)
  {
    try
    {
      return getBranchesByCompany(id_company);
    }
    catch(erro)
    {
        return [];
    }
  }

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
        const info = await carregarEmpresas();
        setCompanies(info);
        
      };
    fetchCompanies();

}, []);

useEffect(() => {
    if(selectedCompany)
    {
        const fetchBranches = async () => {
            const info = await carregarSede(selectedCompany);
            setBranches(info);
            
          };
        fetchBranches();
    }
}, [selectedCompany]);

useEffect(() => {
  const inserirInformacoesAtivoServidor = async () => {
    const info = await carregarAtivoServer(patrimonyNumber);
    setSelectedCompany(info.company.id_company)
    setSelectedBranch(info.company.id_branch)

    setAsset(info)
    setIsLoading(false);
  };
  
  inserirInformacoesAtivoServidor();
}, []);
  const handleCancel = () => {
    navigate("/ativos/servidores");
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return(
    <Container>
    <div className={styles.mainContainerCenter}>
      <div className={styles.containerCenter}>
        <div className={styles.activeNumber}>
          <h2>ATIVO #<span>{asset.patrimony_number}</span></h2>
        </div>
        <form action="#" className={styles.formActive}>
          <div className={styles.activeInputs}>
            <label className={styles.title}>MONITORAR</label>
            <select name="monitorar">
              <option value="1">SIM</option>
              <option value="2">NÃO</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>STATUS</label>
            <select id="status" name="status" onChange={handleChange} value={asset.id_status}>
              <option value="1">Em uso</option>
              <option value="2">Manutenção</option>
              <option value="3">Armazenado</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>CATEGORIA</label>
            <select id="categoria" name="categoria" onChange={handleChange} value={asset.id_category}>
            <option value="0">Selecione uma Categoria</option>
              <option value="1">AD</option>
              <option value="2">Cloud</option>
              <option value="3">Aplicação</option>
              <option value="4">Backup</option>
              <option value="5">Banco de dados (MySQL)</option>
              <option value="6">SAP</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>Nº PATRIMONIO</label>
            <input 
              type="text"
              name="patrimonio"
              id="patrimonio"
              onChange={handleChange}
              value={asset.patrimony_number}
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>NOME</label>
            <input 
              type="text"
              name="nome"
              id="nome"
              onChange={handleChange}
              value={asset.name}
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>HOST</label>
            <input 
              type="text"
              name="host"
              id="host"
              onChange={handleChange}
              value={asset.host}
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>PORTA</label>
            <input 
              type="text"
              name="porta"
              id="porta"
              onChange={handleChange}
              value={asset.port}
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>EMPRESA</label>
            <select 
                  id="empresa"
                  name="empresa"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
              >
                  <option value="0">Selecione uma Empresa</option>
                  {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                          {company.name}
                      </option>
                  ))}
              </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>LOCALIZAÇÃO</label>
            <input 
              type="text"
              name="localização"
              onChange={handleChange}
              value={asset.location}
            />
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>SEDE</label>
            <select 
                  id="sede"
                  name="sede"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}    
              >
                  <option value="0">Selecione uma Sede</option>
                  {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                              {branch.branch_name}
                          </option>
                      ))}
              </select>
          </div>
          <div className={styles.assetFormGroupFullWidth}>
            <label htmlFor="anotacao">ANOTAÇÃO</label>
            <textarea name="anotacao" rows="5" className={styles.fullWidth} onChange={handleChange} value={asset.description}></textarea>
          </div>
        </form>
        <div className={styles.buttonGroup}>
          <div className={styles.boxLeftButtonGroup}>
            <img
              className={styles.deleteButton}
              src={iconeExcluir}>
            </img>
          </div>
          <div className={styles.boxRightButtonGroup}>
            <button 
              className={styles.saveButton}
              >SALVAR</button>
            <button className={styles.cancelButton} onClick={handleCancel}>CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  </Container>
    )
}

export default EditarAtivoServ