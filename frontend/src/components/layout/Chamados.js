import Container from './Container'
import styles from './Chamados.module.css'
import { NavLink } from 'react-router-dom';

import { useState } from 'react'
import ChamadosAbertos from '../pages/ChamadosAbertos';

function Chamados(props){


    return(
        <Container>
            <h2 className={styles.title}>CHAMADOS</h2>
            <div className={styles.borderButton}>
                <NavLink to={`/chamados/criar`}>
                    <button>CRIAR CHAMADO</button>
                </NavLink> 
                <NavLink to={`/chamados/historico`}>
                    <button className={styles.bdGray}>HISTÓRICO</button>
                </NavLink> 
            </div>
            <div className={styles.notBorderButton}>
                <NavLink to={`/chamados/abertos`}>
                    <button>ABERTOS</button>
                </NavLink> 
                <NavLink to={`/chamados/sem-tecnico`}>
                    <button>SEM TÉCNICO</button>
                </NavLink>
                <NavLink to={`/chamados/prioridade-alta`}>
                    <button>PRIORIDADE ALTA</button>
                </NavLink>
                <NavLink to={`/chamados/prazo-vencendo`}>
                    <button>PRAZO VENCENDO</button>
                </NavLink>
                <NavLink to={`/chamados/vencidos`}>
                    <button>VENCIDOS</button>
                </NavLink>
            </div>
            <div>{props.children}</div>
        </Container>
        
    )
}

export default Chamados