import Container from './Container'
import styles from './Ativos.module.css'
import { NavLink } from 'react-router-dom';

function AtivosLt (props){
    return(
        <Container>

            <h2 className={styles.title}>ATIVOS</h2>
            <div className={styles.borderButton}>
                <NavLink to={`/ativos/criar/hardware`}>
                    <button>CRIAR ATIVO</button>
                </NavLink> 
              
            </div>

            <div id="selecionado" className={styles.notBorderButton}>
                <NavLink to={`/ativos/hardware`}>
                    <button>HARDWARE</button>
                </NavLink>
                <NavLink to={`/ativos/servidores`}>
                    <button>SERVIDORES</button>
                </NavLink>
            </div>

            <div>{props.children}</div>
        </Container>
        
    )



}

export default AtivosLt