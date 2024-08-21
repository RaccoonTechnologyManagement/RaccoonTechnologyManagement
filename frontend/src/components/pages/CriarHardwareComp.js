import React, { useState } from 'react';
import styles from './CriarHardwareComp.module.css'

function CriarHardwareComp () {

    // Constante pra sumir campo de localização quando selececionado a categoria "Periferico"
    const [showLocalizacao, setShowLocalizacao] = useState(true);
    

    const handleCancel = () => { // Basicamente mando o botão cancelar limpar os campos
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
        document.getElementById('user').value = '';
        document.getElementById('anotacao').value = '';
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário
        console.log('Formulário enviado'); // Aqui tambem exibe no console log uma mensagem de sucesso

        const isFormValid = () => { // Funçãozinha pra que não seja enviado um formulario com dados vazios
            const fields = [
                'monitorar', 'status', 'categoria', 'patrimonio', 'nome', 'marca', 'modelo', 'serie',
                'ipv4', 'ipv6', 'mac-rede', 'mac-wifi', 'empresa', 'sede', 'localizacao', 'user', 'anotacao'
            ];
            return fields.some(field => document.getElementById(field).value.trim() !== '');
        };

        if (!isFormValid()) {
            alert('Tem um viado lendo isso aqui!');
            return;
        }
        
        const formData = {
            monitorar: document.getElementById('monitorar').value,
            status: document.getElementById('status').value,
            categoria: document.getElementById('categoria').value,
            patrimonio: document.getElementById('patrimonio').value,
            nome: document.getElementById('nome').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            serie: document.getElementById('serie').value,
            ipv4: document.getElementById('ipv4').value,
            ipv6: document.getElementById('ipv6').value,
            macRede: document.getElementById('mac-rede').value,
            macWifi: document.getElementById('mac-wifi').value,
            empresa: document.getElementById('empresa').value,
            sede: document.getElementById('sede').value,
            localizacao: document.getElementById('localizacao').value,
            user: document.getElementById('user').value,
            anotacao: document.getElementById('anotacao').value,
        };

        console.log(formData); // Aqui é pra exibir os dados armazenados no console.log do navegador, pra treinar...
    };

    // Aqui jaz o evento quando é setado periferico na categoria
    const handleCategoriaChange = (event) => {
        const categoria = event.target.value;
        setShowLocalizacao(categoria !== 'periferico');
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
                            <option value="periferico">SIM</option>
                            <option value="periferico">NÃO</option>
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
                        <select id="categoria" name="categoria" onChange={handleCategoriaChange}>
                            <option value=""></option>
                            <option value="periferico">PERIFÉRICO</option>
                            <option value="hardware">HARDWARE</option>
                        </select>
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="patrimonio">Nº DE PATRIMONIO</label>
                        <input type="text" id="patrimonio" name="patrimonio" />
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="nome">NOME</label>
                        <input type="text" id="nome" name="nome" />
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
                        <input type="text" id="ipv4" name="ipv4" />
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
                        <select id="empresa" name="empresa">
                            <option value=""></option>
                            <option value="empresa1">RACCON</option>
                            <option value="empresa2">GOATS</option>
                            <option value="empresa3">TI</option>
                        </select>
                    </div>
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="sede">SEDE</label>
                        <select id="sede" name="sede">
                            <option value=""></option>
                            <option value="sede1">FILIAL SP</option>
                            <option value="sede2">FILIAL RJ</option>
                            <option value="sede3">FILIAL SC</option>
                        </select>
                    </div>
                    {showLocalizacao && (
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="localizacao">LOCALIZAÇÃO</label>
                        <input type="text" id="localizacao" name="localizacao" />
                    </div>
                    )}
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
        </div>
    )
}

export default CriarHardwareComp