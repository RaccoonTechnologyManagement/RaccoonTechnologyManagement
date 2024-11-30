import { useEffect, useState } from 'react';
import { getCompanys, getBranchesByCompany, getPersonByBranch, createAssetHardware } from '../data/api';
import styles from './CriarHardwareComp.module.css';
import { useNavigate} from 'react-router-dom';

function CriarHardwareComp() {
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});

    const handleIPv4Change = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9.]/g, '');
        event.target.value = numericValue;
    };

    const navigate = useNavigate();

    async function criarAtivo()
    {

      try
      {
        let data = {
            model: document.getElementById('modelo').value,
            brand: document.getElementById('marca').value,
            patrimony_number: document.getElementById('patrimonio').value,
            serial_number: document.getElementById('serie').value,
            id_subcategory: document.getElementById('categoria').value,
            id_branch: document.getElementById('sede').value,
            ip_address: document.getElementById('ipv4').value,
            mac_address: document.getElementById('mac-rede').value,
            network_mac_address: document.getElementById('mac-wifi').value,
            ipv6: document.getElementById('ipv6').value,
            ipv4: document.getElementById('ipv4').value,
            description: document.getElementById('anotacao').value,
            location: document.getElementById('localizacao').value,
            id_status: document.getElementById('status').value,
            id_person: document.getElementById('user').value
        }

        return createAssetHardware(data);
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
    const [selectedBranch, setselectedBranch] = useState('');


    useEffect(() => {
        const fetchCompanies = async () => {
            const info = await carregarEmpresas();
            setCompanies(info);
            
          };
        fetchCompanies();

    }, []);

    useEffect(() => {
        setUsers([]);
        setselectedBranch(0);
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
        setErrors({});
        document.getElementById('status').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('patrimonio').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('serie').value = '';
        document.getElementById('ipv4').value = '';
        document.getElementById('ipv6').value = '';
        document.getElementById('mac-rede').value = '';
        document.getElementById('mac-wifi').value = '';
        document.getElementById('empresa').value = 0;
        document.getElementById('sede').value = 0;
        document.getElementById('localizacao').value = '';
        document.getElementById('user').value = '';
        document.getElementById('anotacao').value = '';
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
        criarAtivo();
        setShowPopup(true);
        
        setTimeout(() => {
            setShowPopup(false);
            navigate('/ativos/hardware');
        }, 1000);
        }
    };

    return (
        <div>
            <div className={styles.assetFormWrapper}>
                <h1 className={styles.assetFormTitle}>CRIAR ATIVO</h1>
                <form className={styles.assetForm}>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="status">STATUS</label>
                        <select id="status" name="status">
                            <option value="1">Em uso</option>
                            <option value="2">Manutenção</option>
                            <option value="3">Armazenado</option>
                        </select>
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="categoria">CATEGORIA</label>
                        <select id="categoria" name="categoria" className={errors.categoria ? styles.errorInput : ''}>
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
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="patrimonio">Nº DE PATRIMONIO</label>
                        <input type="text" id="patrimonio" name="patrimonio" className={errors.patrimonio ? styles.errorInput : ''} />
                        {errors.patrimonio && <span className={styles.errorText}>{errors.patrimonio}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="marca">MARCA</label>
                        <input type="text" id="marca" name="marca" className={errors.marca ? styles.errorInput : ''} />
                        {errors.marca && <span className={styles.errorText}>{errors.marca}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="modelo">MODELO</label>
                        <input type="text" id="modelo" name="modelo" className={errors.modelo ? styles.errorInput : ''} />
                        {errors.modelo && <span className={styles.errorText}>{errors.modelo}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="serie">NUMERO DE SÉRIE</label>
                        <input type="text" id="serie" name="serie" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="ipv4">IPV4</label>
                        <input type="text" id="ipv4" name="ipv4" className={errors.ipv4 ? styles.errorInput : ''} onChange={handleIPv4Change} />
                        {errors.ipv4 && <span className={styles.errorText}>{errors.ipv4}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="ipv6">IPV6</label>
                        <input type="text" id="ipv6" name="ipv6" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="mac-rede">MAC REDE</label>
                        <input type="text" id="mac-rede" name="mac-rede" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="empresa">EMPRESA</label>
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
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="mac-wifi">MAC WIFI</label>
                        <input type="text" id="mac-wifi" name="mac-wifi" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="sede">SEDE</label>
                        <select 
                            id="sede"
                            name="sede"
                            className={errors.sede ? styles.errorInput : ''}
                            value={selectedBranch}
                            onChange={(e) => setselectedBranch(e.target.value)}    
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
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="localizacao">LOCALIZAÇÃO</label>
                        <input type="text" id="localizacao" name="localizacao" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="user">USUARIO</label>
                        <select id="user" name="user" className={errors.user ? styles.errorInput : ''}>
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
                            <textarea id="anotacao" name="anotacao" rows="5" className={styles.fullWidth}></textarea>
                    </div>
                </form>
            </div>

            <div className={styles.buttonGroup}>
                <button type="button" className={styles.createButton} onClick={handleSubmit}>CRIAR ATIVO</button>
                <button type="button" className={styles.cancelButton} onClick={handleCancel}>CANCELAR</button>
            </div>

            {showPopup && (
                <div className={styles.popup}>
                    Ativo criado com sucesso!
                </div>
            )}
        </div>
    );
}

export default CriarHardwareComp;
