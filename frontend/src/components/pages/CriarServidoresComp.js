import React, { useState } from 'react';
import styles from './CriarHardwareComp.module.css';

function CriarServidoresComp() {
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({}); // Estado para armazenar erros de validação

    const handleIPv4Change = (event) => {
        const { value } = event.target;
        // Remove caracteres que não são números
        const numericValue = value.replace(/[^0-9.]/g, '');
        event.target.value = numericValue;
    };

    const handleCancel = () => {
        setErrors({}); // Limpa os erros ao cancelar
        document.getElementById('monitorar').value = '';
        document.getElementById('status').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('patrimonio').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('serie').value = '';
        document.getElementById('ipv4').value = '';
        document.getElementById('ipv6').value = '';
        document.getElementById('mac-rede').value = '';
        document.getElementById('mac-wifi').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('sede').value = '';
        document.getElementById('localizacao').value = '';
        document.getElementById('departamento').value = '';
        document.getElementById('user').value = '';
        document.getElementById('anotacao').value = '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const sede = document.getElementById('sede').value.trim();
        const ipv4 = document.getElementById('ipv4').value.trim();
        const monitorar = document.getElementById('monitorar').value;

        // Validação dos campos obrigatórios
        let validationErrors = {};
        if (!nome) validationErrors.nome = 'Campo obrigatório';
        if (!categoria) validationErrors.categoria = 'Campo obrigatório';
        if (!empresa) validationErrors.empresa = 'Campo obrigatório';
        if (!sede) validationErrors.sede = 'Campo obrigatório';

        // Validação do campo IPv4 se "Monitorar" for "SIM"
        if (monitorar === 'SIM' && !ipv4) {
            validationErrors.ipv4 = 'IPv4 é obrigatório para Monitoramento';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Define erros de validação
            return;
        }

        const formData = {
            monitorar,
            status: document.getElementById('status').value,
            categoria,
            patrimonio: document.getElementById('patrimonio').value,
            nome,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            serie: document.getElementById('serie').value,
            ipv4,
            ipv6: document.getElementById('ipv6').value,
            macRede: document.getElementById('mac-rede').value,
            macWifi: document.getElementById('mac-wifi').value,
            empresa,
            sede,
            localizacao: document.getElementById('localizacao').value,
            user: document.getElementById('user').value,
            anotacao: document.getElementById('anotacao').value,
        };

        console.log(formData);

        setShowPopup(true);
        handleCancel();

        setTimeout(() => { // Tempo de popuo
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div>
            <div className={styles.assetFormWrapper}>
                <h1 className={styles.assetFormTitle}>CRIAR ATIVO</h1>
                <form className={styles.assetForm}>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="monitorar">MONITORAR</label>
                        <select id="monitorar" name="monitorar">
                            <option value=""></option>
                            <option value="SIM">SIM</option>
                            <option value="NÃO">NÃO</option>
                        </select>
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="status">STATUS</label>
                        <select id="status" name="status">
                            <option value=""></option>
                            <option value="ativo">ATIVO</option>
                            <option value="inativo">INATIVO</option>
                        </select>
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="categoria">CATEGORIA</label>
                        <select id="categoria" name="categoria" className={errors.categoria ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="backup">BACKUP</option>
                            <option value="ad">AD</option>
                            <option value="aplicacao">APLICAÇÃO</option>
                            <option value="storage">STORAGE</option>
                        </select>
                        {errors.categoria && <span className={styles.errorText}>{errors.categoria}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="patrimonio">Nº DE PATRIMONIO</label>
                        <input type="text" id="patrimonio" name="patrimonio" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="nome">NOME</label>
                        <input type="text" id="nome" name="nome" className={errors.nome ? styles.errorInput : ''} />
                        {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
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
                        <label htmlFor="mac-wifi">MAC WIFI</label>
                        <input type="text" id="mac-wifi" name="mac-wifi" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="empresa">EMPRESA</label>
                        <select id="empresa" name="empresa" className={errors.empresa ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="empresa1">RACCON</option>
                            <option value="empresa2">GOATS</option>
                            <option value="empresa3">TI</option>
                        </select>
                        {errors.empresa && <span className={styles.errorText}>{errors.empresa}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="sede">SEDE</label>
                        <select id="sede" name="sede" className={errors.sede ? styles.errorInput : ''}>
                            <option value=""></option>
                            <option value="sede1">FILIAL SP</option>
                            <option value="sede2">FILIAL RJ</option>
                            <option value="sede3">FILIAL SC</option>
                        </select>
                        {errors.sede && <span className={styles.errorText}>{errors.sede}</span>}
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="localizacao">LOCALIZAÇÃO</label>
                        <input type="text" id="localizacao" name="localizacao" />
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
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="user">USUARIO</label>
                        <select id="user" name="user">
                            <option value=""></option>
                            <option value="user1">ryan.hyggor</option>
                            <option value="user2">mariana.souza</option>
                            <option value="user3">bruna.silva</option>
                        </select>
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
