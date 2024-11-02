import React, { useState } from 'react';
import styles from './CriarLicencaComp.module.css';
import {InfoSearch} from '../component/Search'
import iconeInput from '../../img/lupa.png'

function CriarLicencaComp (){
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [licencasExpiram, setLicencasExpiram] = useState(false);
    const [search, setSearch] = useState("");
    const [usuarios, setUsuarios] = useState([{ id: Math.random(), value: '' }]);

    const handleAddUsuario = () => {
        setUsuarios([...usuarios, { id: Math.random(), value: '' }]); // Adiciona um novo usuário
    };

    const handleRemoveUsuario = (id) => {
        if (usuarios.length > 1) { // Permite remover apenas se houver mais de um usuário
            setUsuarios(usuarios.filter(usuario => usuario.id !== id)); // Remove o usuário com o ID correspondente
        }
    };

    const handleInputChange = (id, value) => {
        setUsuarios(usuarios.map(usuario => 
            usuario.id === id ? { ...usuario, value } : usuario
        ));
    };

    const handleAddUser = (event) => {
        event.preventDefault(); // Impede a atualização da página
        setUsuarios([...usuarios, { id: Math.random(), value: '' }]);
    };

    const handleRemoveUser = (id) => {
        // Não permite remover o primeiro usuário
        if (usuarios.length > 1) {
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        }
    };

    const handleUserChange = (id, event) => {
        const updatedUsuarios = usuarios.map(usuario =>
            usuario.id === id ? { ...usuario, value: event.target.value } : usuario
        );
        setUsuarios(updatedUsuarios);
    };


    const handleCancel = () => {
        setErrors({});
        document.getElementById('software').value = '';
        document.getElementById('status').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('sede').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('licencas-totais').value = '';
        document.getElementById('licencas-restante').value = '';
        document.getElementById('anotacao').value = '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const software = document.getElementById('software').value.trim();
        const status = document.getElementById('status').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const sede = document.getElementById('sede').value.trim();

        // Validação dos campos obrigatórios
        let validationErrors = {};
        if (!software) validationErrors.software = 'Campo obrigatório';
        if (!status) validationErrors.status = 'Campo obrigatório';
        if (!empresa) validationErrors.empresa = 'Campo obrigatório';
        if (!sede) validationErrors.sede = 'Campo obrigatório';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = {
            software,
            status,
            empresa,
            sede,
            departamento: document.getElementById('departamento').value,
            licencasTotais: document.getElementById('licencas-totais').value,
            licencasRestante: document.getElementById('licencas-restante').value,
            anotacao: document.getElementById('anotacao').value,
        };

        console.log(formData);

        setShowPopup(true);
        handleCancel();

        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
            <div className={styles.assetFormWrapper}>
                <h1 className={styles.assetFormTitle}>CRIAR ATIVO</h1>
                <form className={styles.assetForm}>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="software">SOFTWARE</label>
                        <select id="software" name="software" className={errors.software ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="solidworks">SOLIDWORKS</option>
                            <option value="adobe">ADOBE</option>
                        </select>
                        {errors.software && <span className={styles.errorText}>{errors.software}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="status">STATUS</label>
                        <select id="status" name="status" className={errors.status ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="ativo">ATIVO</option>
                            <option value="inativo">INATIVO</option>
                        </select>
                        {errors.status && <span className={styles.errorText}>{errors.status}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="empresa">EMPRESA</label>
                        <select id="empresa" name="empresa" className={errors.empresa ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="empresa1">RACCON</option>
                            <option value="empresa2">GOATS</option>
                        </select>
                        {errors.empresa && <span className={styles.errorText}>{errors.empresa}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="sede">SEDE</label>
                        <select id="sede" name="sede" className={errors.sede ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="sede1">FILIAL SP</option>
                            <option value="sede2">FILIAL RJ</option>
                        </select>
                        {errors.sede && <span className={styles.errorText}>{errors.sede}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="departamento">DEPARTAMENTO</label>
                        <select id="departamento" name="departamento">
                            <option value=""></option>
                            <option value="departamento1">FISCAL</option>
                            <option value="departamento2">TI</option>
                            <option value="departamento3">RH</option>
                        </select>
                    </div>



                    <div className={styles.licencaContainer}>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="licencas-totais" className={styles.labelCentralizado}>LICENÇAS TOTAL</label>
                        <input type="number" id="licencas-totais" name="licencas-totais" className={styles.licencaInput} />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="licencas-restante" className={styles.labelCentralizado}>LICENÇAS RESTANTE</label>
                        <input type="number" id="licencas-restante" name="licencas-restante" className={styles.licencaInput} />
                    </div>
                </div>

                <div className={styles.containerInput}>
                    <input 
                    type="text" 
                    placeholder='Pesquisar' 
                    onChange={(e)=>setSearch(e.target.value)}
                    />
                    <img src={iconeInput}></img>
                </div> 



                 {/* Toggle para Licenças Expiram */}
                 <div className={styles.toggleContainer}>
                    <label className={styles.toggleLabel}>
                        LICENÇAS EXPIRAM
                        <input
                            type="checkbox"
                            checked={licencasExpiram}
                            onChange={() => setLicencasExpiram(!licencasExpiram)}
                        />
                        <span className={styles.toggle}></span>
                    </label>
                </div>


                    <div>
                        {usuarios.map(usuario => (
                            <div key={usuario.id} className={styles.selectContainer}>
                                <button type="button" className={styles.addButton} onClick={handleAddUsuario}>+</button>
                                <select
                                    id={`usuario-${usuario.id}`}
                                    name={`usuario-${usuario.id}`}
                                    className={styles.select}
                                    value={usuario.value}
                                    onChange={(e) => handleInputChange(usuario.id, e.target.value)} // Atualiza o valor do select
                                >
                                    <option value=""></option>
                                    <option value="user1">ryan.hyggor</option>
                                    <option value="user2">teste.teste</option>
                                </select>

                    
                
            
                                {usuarios.length > 1 && (
                                    <button type="button" className={styles.removeButton} onClick={() => handleRemoveUsuario(usuario.id)}>-</button>
                                )}
                            </div>
                        ))}
                    </div>

                    {licencasExpiram && (
        <div className={styles.dateContainer}>
            <div className={styles.dateGroup}>
                <label htmlFor="data-inicial">Data Inicial</label>
                <input 
                    type="date" 
                    id="data-inicial" 
                    name="data-inicial" 
                    className={styles.dateInput} 
                />
            </div>
            <div className={styles.dateGroup}>
                <label htmlFor="data-final">Data Final</label>
                <input 
                    type="date" 
                    id="data-final" 
                    name="data-final" 
                    className={styles.dateInput} 
                />
            </div>
        </div>
    )}




                   
                    <div className={styles.assetFormGroupFullWidth}>
                            <label htmlFor="anotacao">ANOTAÇÃO</label>
                            <textarea id="anotacao" name="anotacao" rows="5" className={styles.fullWidth}></textarea>
                    </div>
            
                </form>
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
export default CriarLicencaComp;
