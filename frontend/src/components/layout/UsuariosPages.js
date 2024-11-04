import Container from './Container'
import { NavLink } from 'react-router-dom';
import styles from './CriarAtivo.module.css'

function UsuariosPages (props){
    return(
        <Container>
            <div id="selecionado" className={styles.notBorderButton}>
                <NavLink to={`/ativos/criar/hardware`}>
                    <button>USUARIOS</button>
                </NavLink> 
                <NavLink to={`/ativos/criar/servidor`}>
                    <button>EMPRESAS</button>
                </NavLink>
                <NavLink to={`/ativos/criar/software`}>
                    <button>SEDES</button>
                </NavLink>
                <NavLink to={`/ativos/criar/licenca`}>
                    <button>DEPARTAMENTO</button>
                </NavLink>                                              
            </div>

            <div>{props.children}</div>
        </Container>
        
    )



}

export default UsuariosPages