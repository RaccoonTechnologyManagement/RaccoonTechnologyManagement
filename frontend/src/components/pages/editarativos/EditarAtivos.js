import iconeExcluir from '../../../img/excluir.png'; 
import styles from './EditarAtivos.module.css';
import { useNavigate} from 'react-router-dom';
import Container from '../../layout/Container';
import { useEffect, useState } from 'react';
import { getInfoHardwareAsset, getCompanys, getBranchesByCompany, getPersonByBranch, deleteOneHardwareAsset } from '../../data/api'

function EditarAtivos () {
    const patrimonyNumber = localStorage.getItem('patrimonyNumberHardware');

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    async function deletarAtivoHardware(patrimonyNumber)
    {
      try
      {
          return await deleteOneHardwareAsset(patrimonyNumber);
      }
      catch(erro)
      {
          return [];
      }
    }

    async function carregarAtivoHardware(patrimonyNumber)
    {
      try
      {
          let asset = await getInfoHardwareAsset(patrimonyNumber);
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

    async function carregarPessoasPorSede(id_branch)
    {
      try
      {
        return getPersonByBranch(id_branch);
      }
      catch(erro)
      {
          return [];
      }
    }

    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [users, setUsers] = useState([]);

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
      setUsers([]);
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
      setUsers([]);
      if(selectedBranch)
      {
          const fetchPerson = async () => {
              const info = await carregarPessoasPorSede(selectedBranch);
              setUsers(info);
              
            }; 
          fetchPerson();
      }
  }, [selectedBranch]);

  const handleCancel = () => {
    navigate("/ativos/hardware");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deletarAtivoHardware(patrimonyNumber)
    navigate("/ativos/hardware");

    setTimeout(() => {
      navigate("/ativos/hardware");
  }, 1000);
  };

  const [asset, setAsset] = useState([]);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAsset({ ...asset, [name]: value });
    };

    useEffect(() => {
      const inserirInformacoesAtivoHardware = async () => {
        const info = await carregarAtivoHardware(patrimonyNumber);
        setSelectedCompany(info.company.company)
        setSelectedBranch(info.company.branch)

        setAsset(info)
        setIsLoading(false);
      };
      
      inserirInformacoesAtivoHardware();
    }, []);

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
              <label className={styles.title}>STATUS</label>
              <select id="status" name="status" defaultValue={asset.status}>
                  <option value="1">Em uso</option>
                  <option value="2">Manutenção</option>
                  <option value="3">Armazenado</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>CATEGORIA</label>
              <select name="categoria" defaultValue={asset.category}>
              <option value="0">Selecione uma Categoria</option>
                  <option value="1">Desktop</option>
                  <option value="2">Notebook</option>
                  <option value="3">Mouse</option>
                  <option value="4">Teclado</option>
                  <option value="5">Webcam</option>
                  <option value="6">Impressora</option>
                  <option value="7">Monitor</option>
                  <option value="8">Switch</option>
                  <option value="9">Firewall</option>
                  <option value="10">Router</option>
                  <option value="11">DVR</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>Nº PATRIMONIO</label>
              <input 
                type="text"
                name="patrimonio"
                value={asset.patrimony_number}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MARCA</label>
              <input 
                type="text"
                name="marca"
                value={asset.brand}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MODELO</label>
              <input 
                type="text"
                name="modelo"
                value={asset.model}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>NUMERO DE SERIE</label>
              <input 
                type="text"
                name="nserie"
                value={asset.serial_number}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>IPV4</label>
              <input 
                type="text"
                name="ipv4"
                value={asset.ipv4}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>IPV6</label>
              <input 
                type="text"
                name="ipv6"
                value={asset.ipv6}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MAC REDE</label>
              <input 
                type="text"
                name="macrede"
                value={asset.network_mac_address}
                onChange={handleChange}
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
              <label className={styles.title}>MAC WIFI</label>
              <input 
                type="text"
                name="macwifi"
                value={asset.mac_address}
                onChange={handleChange}
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
            <div className={styles.activeInputs}>
              <label className={styles.title}>LOCALIZAÇÃO</label>
              <input 
                type="text"
                name="localização"
                value={asset.location}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>USUARIO</label>
              <select id="user" name="user" value={asset.person}>
                  <option value="1">Selecione um Usuário</option>
                  {users.map((user) => (
                          <option key={user.id} value={user.id}>
                              {user.user.username}
                          </option>
                      ))}
              </select>
            </div>
            <div className={styles.assetFormGroupFullWidth}>
              <label htmlFor="anotacao">ANOTAÇÃO</label>
              <textarea name="anotacao" rows="5" className={styles.fullWidth} value={asset.description}></textarea>
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

export default EditarAtivos