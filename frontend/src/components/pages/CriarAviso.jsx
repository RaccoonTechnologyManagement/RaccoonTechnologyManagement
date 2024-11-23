import React, { useState, useEffect  } from "react";
import Container from "../layout/Container";
import './CriarAviso.css';

function CriarAviso(){

    const [envioGeral, setEnvioGeral] = useState(false);

    return(
       <Container>
        <div className="criar-aviso-container">
      <h1>CRIAR AVISO</h1>
      <form className="criar-aviso-form">
        <div className="input-group">
          <label>TÍTULO</label>
          <input type="text" placeholder="Digite o título" />
        </div>
        <div className="input-group">
          <label>DESCRIÇÃO</label>
          <textarea placeholder="Digite a descrição" />
        </div>
        <div className="row">
          <div className="input-group">
            <label>EMPRESA</label>
            <select>
              <option>Sigma Saúde e Bem-Estar Ltda</option>
            </select>
          </div>
          <div className="input-group">
            <label>PRIORIDADE</label>
            <select>
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>ENVIO GERAL</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="envio-geral"
                checked={envioGeral}
                onChange={() => setEnvioGeral(!envioGeral)}
              />
              <label htmlFor="envio-geral"></label>
            </div>
          </div>
          <div className="input-group">
            <label>DATA PROGRAMADA</label>
            <input type="date" />
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>SEDE</label>
            <select>
              <option>Filial São Paulo</option>
            </select>
          </div>
          <div className="input-group">
            <label>EXPIRA EM</label>
            <input type="date" />
          </div>
        </div>
        <div className="input-group">
          <label>DEPARTAMENTO</label>
          <select>
            <option>Vendas</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit" className="create-button">CRIAR AVISO</button>
          <button type="button" className="cancel-button">CANCELAR</button>
        </div>
      </form>
    </div>
       </Container>
    )
}


export default CriarAviso

