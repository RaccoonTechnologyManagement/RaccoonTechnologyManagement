import React, { useState }  from "react";
import styles from './MonitorarGerarToken.module.css';

function GerarTokenMonitoramento () {
    const [token, setToken] = useState("");

    const jsonData = {
        "patrimony_number": "1",
        "id_status": "1|2"
    };

      
      const gerarToken = () => {
        const newToken = "TOKEN_GERADO_12345"; 
        setToken(newToken);
        alert("Token gerado com sucesso!");
    };

    return (
        <>
        
        <h1 className={styles.title}>Gere um token de autenticação para integração com a RACCOON TECH API e assim manipular o monitoramento de ativos, com base no número de patrimônio e no status do ativo.</h1>
        <h1 className={styles.title}>Método HTTP: POST</h1>
        <h1 className={styles.title}>URL: URL_DA_API/gerar-token-monitoramento</h1>

            <div className={styles.jsonBox}>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>

            
            <button className={styles.botaoGerar} onClick={gerarToken}>
                Gerar Token
            </button>

            
            {token && (
                <div className={styles.tokenBox}>
                    <h2>Token Gerado:</h2>
                    <p>{token}</p>
                </div>
            )}

        </>
    )
}

export default GerarTokenMonitoramento