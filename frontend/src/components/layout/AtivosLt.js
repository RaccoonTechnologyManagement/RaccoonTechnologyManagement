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
                <NavLink to={`/ativos/todos`}>
                    <button>TODOS</button>
                </NavLink> 
                <NavLink to={`/ativos/hardware`}>
                    <button>HARDWARE</button>
                </NavLink>
                <NavLink to={`/ativos/servidores`}>
                    <button>SERVIDORES</button>
                </NavLink>
                <NavLink to={`/ativos/software`}>
                    <button>SOFTWARE</button>
                </NavLink>
                <NavLink to={`/ativos/licencas`}>
                    <button>LICENÇAS</button>
                </NavLink>
                <NavLink to={`/ativos/excluidos`}>
                    <button>EXCLUIDOS</button>
                </NavLink>
            </div>

            <div>{props.children}</div>
        </Container>
        
    )



}

export default AtivosLt