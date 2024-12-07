import React, { useState }  from "react";
import styles from './MonitorarGerarToken.module.css';
import { generateTokenMonitor } from '../../data/api';

function GerarTokenMonitoramento () {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function gerarTokenMonitoramento()
    {
      try
      {
        return generateTokenMonitor();
      }
      catch(erro)
      {
          return [];
      }
    }

    const jsonData = {
        "patrimony_number": "< NÚMERO DE PATRIMÔNIO DO ATIVO SERVIDOR >",
        "id_status": "< 0 | 1 >",
        "alert": "< MENSAGEM DO ALERTA >"
    };
    const spacing = 2;

    const gerarToken = async () => {
        setIsLoading(true);
        const newToken = await gerarTokenMonitoramento();
        setIsLoading(false);
        setToken(newToken);
    };

    if (isLoading) {
        return <p>Carregando...</p>;
      }

    return (
        <>
        
        <h1 className={styles.title}>Gere um token de autenticação para integração com a RACCOON TECH API e assim manipular o monitoramento de ativos, com base no número de patrimônio e no status do ativo.</h1>
        <h1 className={styles.title}>Método: PUT</h1>
        <h1 className={styles.title}>URL: raccoontech/gerar-token-monitoramento</h1>
        <h1 className={styles.title}>Parametros:</h1>


            <div className={styles.jsonBox}>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>

            
            <button className={styles.botaoGerar} style={{ marginTop: '1em' }} onClick={gerarToken}>
                Gerar Token
            </button>

            
            {token && (
                <div className={styles.tokenBox} style={{ marginTop: '1em' }}>
                    <h2>Token de Autenticação JWT</h2>
                    <h4 style={{ marginRight: spacing + 'em', marginTop: '1em' }}>Ao gerar um novo token JWT, o token gerado anteriormente será invalidado automaticamente, tornando-o inutilizável. Isso garante que apenas o token mais recente esteja ativo para autenticação.</h4>
                    <p style={{ marginTop: '1em' }}>Token JWT: {token.token}</p>
                </div>
            )}

        </>
    )
}

export default GerarTokenMonitoramento