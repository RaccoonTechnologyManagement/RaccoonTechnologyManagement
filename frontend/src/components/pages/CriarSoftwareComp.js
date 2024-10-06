import React, { useState } from 'react';
import styles from './CriarSoftwareComp.module.css';

function CriarSoftwareComp() {

    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const handleCancel = () => {
        setErrors({});
        document.getElementById('categoria').value = '';
        document.getElementById('status').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('versao').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('sede').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('licencas-totais').value = '';
        document.getElementById('licencas-restante').value = '';
        document.getElementById('anotacao').value = '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const status = document.getElementById('status').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const sede = document.getElementById('sede').value.trim();

        // Validação dos campos obrigatórios
        let validationErrors = {};
        if (!nome) validationErrors.nome = 'Campo obrigatório';
        if (!categoria) validationErrors.categoria = 'Campo obrigatório';
        if (!status) validationErrors.status = 'Campo obrigatório';
        if (!empresa) validationErrors.empresa = 'Campo obrigatório';
        if (!sede) validationErrors.sede = 'Campo obrigatório';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = {
            categoria,
            status,
            nome,
            versao: document.getElementById('versao').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            tipo: document.getElementById('tipo').value,
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
                        <label htmlFor="categoria">CATEGORIA</label>
                        <select id="categoria" name="categoria" className={errors.categoria ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="software">SOFTWARE</option>
                            <option value="hardware">HARDWARE</option>
                        </select>
                        {errors.categoria && <span className={styles.errorText}>{errors.categoria}</span>}
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
                        <label htmlFor="nome">NOME</label>
                        <input type="text" id="nome" name="nome" className={errors.nome ? styles.errorInput : ''} />
                        {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="versao">VERSÃO</label>
                        <input type="text" id="versao" name="versao" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="marca">MARCA</label>
                        <input type="text" id="marca" name="marca" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="modelo">MODELO</label>
                        <input type="text" id="modelo" name="modelo" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="tipo">TIPO</label>
                        <input type="text" id="tipo" name="tipo" />
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
                        <input type="text" id="departamento" name="departamento" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="licencas-totais">LICENÇAS TOTAIS</label>
                        <input type="number" id="licencas-totais" name="licencas-totais" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="licencas-restante">LICENÇAS RESTANTE</label>
                        <input type="number" id="licencas-restante" name="licencas-restante" />
                    </div>
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

export default CriarSoftwareComp;