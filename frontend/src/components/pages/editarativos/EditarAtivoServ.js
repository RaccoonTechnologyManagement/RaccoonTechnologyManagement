import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import styles from './EditarAtivoServ.module.css';
import iconeExcluir from '../../../img/excluir.png'; 
import Container from '../../layout/Container';
import { useEffect, useRef, useState } from 'react';
import { getInfoServerAsset, getCompanys, getBranchesByCompany, deleteOneServerAsset, updateServerAsset } from '../../data/api'

function EditarAtivoServ () {

  const [errors, setErrors] = useState({});
  
  const [asset, setAsset] = useState({
    monitor: "",
    id_status: "",
    id_category: "",
    patrimony_number: "",
    name: "",
    host: "",
    port: "",
    location: "",
    description: "",
    company_id: "",
    branch_id: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };

  const [isLoading, setIsLoading] = useState(true);
  const patrimonyNumber = localStorage.getItem('patrimonyNumberServer');

  const navigate = useNavigate();

  async function atualizarAtivo()
  {
    try
    {
      let data = {
        name: document.getElementById('nome').value,
        patrimony_number: document.getElementById('patrimonio').value,
        host: document.getElementById('host').value,
        id_category: document.getElementById('categoria').value,
        port: document.getElementById('porta').value,
        id_branch: document.getElementById('sede').value,
        location: document.getElementById('localizacao').value,
        monitor: document.getElementById('monitorar').value,
        id_status: document.getElementById('status').value,
        description: document.getElementById('anotacao').value,
      }

        return updateServerAsset(patrimonyNumber, data);
    }
    catch(erro)
    {
        return [];
    }
  }

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

  async function deletarAtivoServidor()
  {
    try
    {
      return deleteOneServerAsset(patrimonyNumber);
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

const handleDelete = (event) => {
  event.preventDefault();
  deletarAtivoServidor()
  navigate("/ativos/hardware");

  setTimeout(() => {
    navigate("/ativos/hardware");
  }, 1000);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const patrimonio = document.getElementById('patrimonio').value;
  const ipv4 = document.getElementById('host').value;
  const categoria = document.getElementById('categoria').value;
  const porta = document.getElementById('porta').value;
  const sede = document.getElementById('sede').value;

  let validationErrors = {};
  
  if (categoria < 1) validationErrors.categoria = 'Campo obrigatório';
  if (sede < 1) validationErrors.sede = 'Campo obrigatório';
  
  if (!nome) validationErrors.nome = 'Campo obrigatório';
  if (!patrimonio) validationErrors.patrimonio = 'Campo obrigatório';
  if (!porta) validationErrors.porta = 'Campo obrigatório';
  if (!ipv4) validationErrors.ipv4 = 'Campo obrigatório';

  if(Object.keys(validationErrors).length > 0)
  {
      setErrors(validationErrors);
      return;
  }
  else
  {
    atualizarAtivo();
      setTimeout(() => {
          navigate('/ativos/servidores');
      }, 1000);
  }
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
            <select id="monitorar" name="monitor" onChange={handleChange} value={asset.monitor ? 1 : 2}>
              <option value="1">SIM</option>
              <option value="2">NÃO</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>STATUS</label>
            <select id="status" name="id_status" onChange={handleChange} value={asset.id_status}>
              <option value="1">Em uso</option>
              <option value="2">Manutenção</option>
              <option value="3">Armazenado</option>
            </select>
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>CATEGORIA</label>
            <select id="categoria" name="id_category" onChange={handleChange} value={asset.id_category} className={errors.categoria ? styles.errorInput : ''}>
            <option value="0">Selecione uma Categoria</option>
              <option value="1">AD</option>
              <option value="2">Cloud</option>
              <option value="3">Aplicação</option>
              <option value="4">Backup</option>
              <option value="5">Banco de dados (MySQL)</option>
              <option value="6">SAP</option>
            </select>
            {errors.categoria && <span className={styles.errorText}>{errors.categoria}</span>}
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>Nº PATRIMONIO</label>
            <input 
              type="text"
              name="patrimony_number"
              className={errors.patrimonio ? styles.errorInput : ''}
              id="patrimonio"
              onChange={handleChange}
              value={asset.patrimony_number}
            />
            {errors.patrimonio && <span className={styles.errorText}>{errors.patrimonio}</span>}
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>NOME</label>
            <input 
              type="text"
              name="name"
              id="nome"
              onChange={handleChange}
              value={asset.name}
              className={errors.nome ? styles.errorInput : ''}
            />
            {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>HOST</label>
            <input 
              type="text"
              name="host"
              id="host"
              className={errors.host ? styles.errorInput : ''}
              onChange={handleChange}
              value={asset.host}
            />
            {errors.host && <span className={styles.errorText}>{errors.host}</span>}
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>PORTA</label>
            <input 
              type="text"
              name="port"
              id="porta"
              className={errors.porta ? styles.errorInput : ''}
              onChange={handleChange}
              value={asset.port}
            />
            {errors.porta && <span className={styles.errorText}>{errors.porta}</span>}
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>EMPRESA</label>
            <select 
                  id="empresa"
                  name="empresa"
                  className={errors.empresa ? styles.errorInput : ''}
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
              {errors.empresa && <span className={styles.errorText}>{errors.empresa}</span>}
          </div>
          <div className={styles.activeInputs}>
            <label className={styles.title}>LOCALIZAÇÃO</label>
            <input 
              type="text"
              name="location"
              id="localizacao"
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
                  className={errors.sede ? styles.errorInput : ''}
                  onChange={(e) => setSelectedBranch(e.target.value)}    
              >
                  <option value="0">Selecione uma Sede</option>
                  {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                              {branch.branch_name}
                          </option>
                      ))}
              </select>
              {errors.sede && <span className={styles.errorText}>{errors.sede}</span>}
          </div>
          <div className={styles.assetFormGroupFullWidth}>
            <label htmlFor="anotacao">ANOTAÇÃO</label>
            <textarea id="anotacao" name="description" rows="5" className={styles.fullWidth} onChange={handleChange} value={asset.description}></textarea>
          </div>
        </form>
        <div className={styles.buttonGroup}>
          <div className={styles.boxLeftButtonGroup}>
            <img
              className={styles.deleteButton}
              onClick={handleDelete}
              src={iconeExcluir}>
            </img>
          </div>
          <div className={styles.boxRightButtonGroup}>
            <button className={styles.saveButton} onClick={handleSubmit}>SALVAR</button>
            <button className={styles.cancelButton} onClick={handleCancel}>CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  </Container>
    )
}

export default EditarAtivoServ