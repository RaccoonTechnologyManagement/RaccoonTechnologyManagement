import styles from './CriarHardwareComp.module.css'

function CriarHardwareComp () {
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
                        <select id="categoria" name="categoria">
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
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="localizacao">LOCALIZAÇÃO</label>
                        <input type="text" id="localizacao" name="localizacao" />
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
                    <div className={styles.assetFormGroup}>
                        <label htmlFor="anotacao">ANOTAÇÃO</label>
                        <textarea id="anotacao" name="anotacao" rows="5"></textarea>
                    </div>
                </form>
            </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.createButton}>CRIAR ATIVO</button>
                    <button type="button" className={styles.cancelButton}>CANCELAR</button>
                </div>
        </div>
    )
}

export default CriarHardwareComp