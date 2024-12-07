import iconeExcluir from '../../../img/excluir.png'; 
import styles from './EditarAtivos.module.css';
import { useNavigate} from 'react-router-dom';
import Container from '../../layout/Container';
import { useEffect, useState } from 'react';
import { getInfoHardwareAsset, getCompanys, getBranchesByCompany, getPersonByBranch, deleteOneHardwareAsset, updateHardwareAsset } from '../../data/api'

function EditarAtivos () {
    const patrimonyNumber = localStorage.getItem('patrimonyNumberHardware');
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);

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

    async function atualizarAtivos()
    {
      try
      {
        let data = {
          model: document.getElementById('modelo').value,
          brand: document.getElementById('marca').value,
          patrimony_number: document.getElementById('patrimonio').value,
          serial_number: document.getElementById('nserie').value,
          id_subcategory: document.getElementById('categoria').value,
          id_branch: document.getElementById('sede').value,
          ip_address: document.getElementById('ipv4').value,
          mac_address: document.getElementById('macrede').value,
          network_mac_address: document.getElementById('macwifi').value,
          ipv6: document.getElementById('ipv6').value,
          ipv4: document.getElementById('ipv4').value,
          description: document.getElementById('anotacao').value,
          location: document.getElementById('localizacao').value,
          id_status: document.getElementById('status').value,
          id_person: document.getElementById('user').value
        }

          return updateHardwareAsset(patrimonyNumber, data);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoria = document.getElementById('categoria').value;
    const patrimonio = document.getElementById('patrimonio').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const sede = document.getElementById('sede').value;
    const user = document.getElementById('user').value;

    let validationErrors = {};
    
    if (categoria < 1) validationErrors.categoria = 'Campo obrigatório';
    if (sede < 1) validationErrors.sede = 'Campo obrigatório';
    if (user < 2) validationErrors.user = 'Campo obrigatório';
    
    if (!patrimonio) validationErrors.patrimonio = 'Campo obrigatório';
    if (!marca) validationErrors.marca = 'Campo obrigatório';
    if (!modelo) validationErrors.modelo = 'Campo obrigatório';

    if(Object.keys(validationErrors).length > 0)
    {
        setErrors(validationErrors);
        return;
    }
    else
    {
      atualizarAtivos();
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/ativos/hardware');
      }, 1000);
    }
};

  const handleDelete = (event) => {
    event.preventDefault();
    deletarAtivoHardware(patrimonyNumber)
    navigate("/ativos/hardware");

    setTimeout(() => {
      navigate("/ativos/hardware");
  }, 1000);
  };

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
    const { name, value } = e.target; // Obtém o nome e valor do input
    setAsset((prevState) => ({
      ...prevState,
      [name]: value, // Atualiza apenas o campo correspondente
    }));
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
              <select id="status" name="status" onChange={handleChange} defaultValue={asset.status}>
                  <option value="1">Em uso</option>
                  <option value="2">Manutenção</option>
                  <option value="3">Armazenado</option>
              </select>
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>CATEGORIA</label>
              <select id="categoria" name="categoria" onChange={handleChange} defaultValue={asset.category} className={errors.categoria ? styles.errorInput : ''}>
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
              {errors.categoria && <span className={styles.errorText}>{errors.categoria}</span>}
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>Nº PATRIMONIO</label>
              <input 
                id="patrimonio"
                type="text"
                name="patrimony_number"
                className={errors.patrimonio ? styles.errorInput : ''}
                value={asset.patrimony_number}
                onChange={handleChange}
              />
              {errors.patrimonio && <span className={styles.errorText}>{errors.patrimonio}</span>}
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MARCA</label>
              <input 
                type="text"
                name="brand"
                id="marca"
                value={asset.brand}
                onChange={handleChange}
                className={errors.marca ? styles.errorInput : ''}
              />
              {errors.marca && <span className={styles.errorText}>{errors.marca}</span>}
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MODELO</label>
              <input 
                type="text"
                id="modelo"
                name="model"
                value={asset.model}
                onChange={handleChange}
                className={errors.modelo ? styles.errorInput : ''}
              />
              {errors.modelo && <span className={styles.errorText}>{errors.modelo}</span>}
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>NUMERO DE SERIE</label>
              <input 
                type="text"
                name="serial_number"
                id="nserie"
                value={asset.serial_number}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>IPV4</label>
              <input 
                type="text"
                id="ipv4"
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
                id="ipv6"
                value={asset.ipv6}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>MAC REDE</label>
              <input 
                type="text"
                name="network_mac_address"
                id="macrede"
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
                name="mac_address"
                id="macwifi"
                value={asset.mac_address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>SEDE</label>
              <select 
                  id="sede"
                  className={errors.sede ? styles.errorInput : ''}
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
              {errors.sede && <span className={styles.errorText}>{errors.sede}</span>}
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>LOCALIZAÇÃO</label>
              <input 
                type="text"
                name="location"
                id="localizacao"
                value={asset.location}
                onChange={handleChange}
              />
            </div>
            <div className={styles.activeInputs}>
              <label className={styles.title}>USUARIO</label>
              <select id="user" name="user" value={asset.person} onChange={handleChange} className={errors.user ? styles.errorInput : ''}>
                  <option value="1">Selecione um Usuário</option>
                  {users.map((user) => (
                          <option key={user.id} value={user.id}>
                              {user.user.username}
                          </option>
                      ))}
              </select>
              {errors.user && <span className={styles.errorText}>{errors.user}</span>}
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
              <button className={styles.saveButton}  onClick={handleSubmit}>SALVAR</button>
              <button className={styles.cancelButton} onClick={handleCancel}>CANCELAR</button>
            </div>

            {showPopup && (
                <div className={styles.popup}>
                    Ativo criado com sucesso!
                </div>
            )}

          </div>
        </div>
      </div>
    </Container>
      )
}

export default EditarAtivos