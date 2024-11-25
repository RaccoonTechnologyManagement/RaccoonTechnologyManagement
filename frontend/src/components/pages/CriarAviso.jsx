import React, { useState } from "react";
import Container from "../layout/Container";
import "./CriarAviso.css";
import { NavLink } from "react-router-dom";

function CriarAviso() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresa, setEmpresa] = useState("Sigma Saúde e Bem-Estar Ltda");
  const [prioridade, setPrioridade] = useState("Alta");
  const [envioGeral, setEnvioGeral] = useState(false);
  const [dataProgramada, setDataProgramada] = useState("");
  const [sede, setSede] = useState("Filial São Paulo");
  const [expiraEm, setExpiraEm] = useState("");
  const [departamento, setDepartamento] = useState("Vendas");

  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    const newErrors = {};
    if (!titulo) newErrors.titulo = "Campo Obrigatório";
    if (!descricao) newErrors.descricao = "Campo Obrigatório";
    if (!dataProgramada) newErrors.dataProgramada = "Campo Obrigatório";
    if (!expiraEm) newErrors.expiraEm = "Campo Obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (!isFormValid()) {
      e.preventDefault(); // Evita a navegação
    }
  };

  return (
    <Container>
      <div className="criar-aviso-container">
        <h1>CRIAR AVISO</h1>
        <form className="criar-aviso-form">
          <div className="input-group">
            <label>TÍTULO</label>
            <input
              type="text"
              placeholder="Digite o título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
          </div>
          <div className="input-group">
            <label>DESCRIÇÃO</label>
            <textarea
              placeholder="Digite a descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
          </div>
          <div className="row">
            <div className="input-group">
              <label>EMPRESA</label>
              <select
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              >
                <option>Sigma Saúde e Bem-Estar Ltda</option>
              </select>
            </div>
            <div className="input-group">
              <label>PRIORIDADE</label>
              <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
              >
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
              <input
                type="date"
                value={dataProgramada}
                onChange={(e) => setDataProgramada(e.target.value)}
              />
              {errors.dataProgramada && <span className="error-message">{errors.dataProgramada}</span>}
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label>SEDE</label>
              <select
                value={sede}
                onChange={(e) => setSede(e.target.value)}
              >
                <option>Filial São Paulo</option>
              </select>
            </div>
            <div className="input-group">
              <label>EXPIRA EM</label>
              <input
                type="date"
                value={expiraEm}
                onChange={(e) => setExpiraEm(e.target.value)}
              />
              {errors.expiraEm && <span className="error-message">{errors.expiraEm}</span>}
            </div>
          </div>
          <div className="input-group">
            <label>DEPARTAMENTO</label>
            <select
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            >
              <option>Vendas</option>
            </select>
          </div>
          <div className="button-group">
            <NavLink to="/usuarios" onClick={handleSubmit}>
              <button type="submit" className="create-button">
                CRIAR AVISO
              </button>
            </NavLink>
            <NavLink to="/usuarios">
              <button type="button" className="cancel-button">
                CANCELAR
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CriarAviso;
