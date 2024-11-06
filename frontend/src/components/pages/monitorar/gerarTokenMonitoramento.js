import React from "react";
import styles from './MonitorarGerarToken.module.css';

function GerarTokenMonitoramento () {

    const jsonData = {
        "patrimony_number": "1",
        "id_status": "1|2"
    };

    return (
        <>
        
        <h1 className={styles.title}>Gere um token de autenticação para integração com a RACCOON TECH API e assim manipular o monitoramento de ativos, com base no número de patrimônio e no status do ativo.</h1>
        <h1 className={styles.title}>Método HTTP: POST</h1>
        <h1 className={styles.title}>URL: URL_DA_API/gerar-token-monitoramento</h1>

            <div className={styles.jsonBox}>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
        </>
    )
}

export default GerarTokenMonitoramento