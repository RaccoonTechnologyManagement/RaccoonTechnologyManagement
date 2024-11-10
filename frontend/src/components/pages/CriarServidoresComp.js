import { useEffect, useState } from 'react';
import styles from './CriarHardwareComp.module.css';
import { getCompanys, getBranchesByCompany, createAssetServer } from '../data/api';
import { useNavigate} from 'react-router-dom';


function CriarServidoresComp() {
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({}); // Estado para armazenar erros de validação

    const handleIPv4Change = (event) => {
        const { value } = event.target;
        // Remove caracteres que não são números
        const numericValue = value.replace(/[^0-9.]/g, '');
        event.target.value = numericValue;
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        setErrors({}); // Limpa os erros ao cancelar
        document.getElementById('monitorar').value = '';
        document.getElementById('status').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('patrimonio').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('ipv4').value = '';
        document.getElementById('porta').value = '';
        document.getElementById('mac-rede').value = '';
        document.getElementById('mac-wifi').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('sede').value = '';
        document.getElementById('localizacao').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('user').value = '';
        document.getElementById('anotacao').value = '';
    };

    async function criarAtivo()
    {

      try
      {
        let data = {
            name: document.getElementById('nome').value,
            patrimony_number: document.getElementById('patrimonio').value,
            host: document.getElementById('ipv4').value,
            id_category: document.getElementById('categoria').value,
            port: document.getElementById('porta').value,
            id_branch: document.getElementById('sede').value,
            location: document.getElementById('localizacao').value,
            monitor: document.getElementById('monitorar').value,
            id_status: document.getElementById('status').value,
            description: document.getElementById('anotacao').value,
        }

        return createAssetServer(data);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const patrimonio = document.getElementById('patrimonio').value;
        const ipv4 = document.getElementById('ipv4').value;
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
            criarAtivo();
            setShowPopup(true);
            
            setTimeout(() => {
                setShowPopup(false);
                navigate('/ativos/servidores');
            }, 1000);
        }
    };


    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);

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

    return (
        <div>
            <div className={styles.assetFormWrapper}>
                <h1 className={styles.assetFormTitle}>CRIAR ATIVO</h1>
                <form className={styles.assetForm}>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="monitorar">MONITORAR</label>
                        <select id="monitorar" name="monitorar">
                            <option value="0">NÃO</option>
                            <option value="1">SIM</option>
                        </select>
                    </div>
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
                            <option value="1">AD</option>
                            <option value="2">Cloud</option>
                            <option value="3">Aplicação</option>
                            <option value="4">Backup</option>
                            <option value="5">Banco de dados (MySQL)</option>
                            <option value="6">SAP</option>
                        </select>
                        {errors.categoria && <span className={styles.errorText}>{errors.categoria}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="patrimonio">Nº DE PATRIMONIO</label>
                        <input type="text" id="patrimonio" name="patrimonio" className={errors.patrimonio ? styles.errorInput : ''} />
                        {errors.patrimonio && <span className={styles.errorText}>{errors.patrimonio}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="nome">NOME</label>
                        <input type="text" id="nome" name="nome" className={errors.nome ? styles.errorInput : ''} />
                        {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="ipv4">HOST</label>
                        <input type="text" id="ipv4" name="ipv4" className={errors.ipv4 ? styles.errorInput : ''} />
                        {errors.ipv4 && <span className={styles.errorText}>{errors.ipv4}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="porta">PORTA</label>
                        <input type="text" id="porta" name="porta" className={errors.porta ? styles.errorInput : ''} />
                        {errors.porta && <span className={styles.errorText}>{errors.porta}</span>}
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
                        <label htmlFor="localizacao">LOCALIZAÇÃO</label>
                        <input type="text" id="localizacao" name="localizacao" />
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

export default CriarServidoresComp;
