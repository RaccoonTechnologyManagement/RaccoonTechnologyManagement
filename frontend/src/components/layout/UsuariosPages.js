import Container from './Container'
import { NavLink } from 'react-router-dom';
import styles from './CriarAtivo.module.css'

function UsuariosPages (props){
    return(
        <>
            <div id="selecionado" className={styles.notBorderButton}>
                <NavLink to={`/usuarios`}>
                    <button>USUARIOS</button>
                </NavLink> 
                <NavLink to={`/usuarios/empresa`}>
                    <button>EMPRESAS</button>
                </NavLink>
                <NavLink to={`/usuarios/sede`}>
                    <button>SEDES</button>
                </NavLink>
                <NavLink to={`/usuarios/departamento`}>
                    <button>DEPARTAMENTO</button>
                </NavLink>                                              
            </div>

            <div>{props.children}</div>
        </>
        
    )



}

export default UsuariosPages