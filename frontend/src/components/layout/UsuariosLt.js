

import Container from './Container'
import styles from './Usuarios.module.css'
import { NavLink } from 'react-router-dom';

function UsuariosLt (props){
    return(
        <Container>

            <h2 className={styles.title}>USUARIOS</h2>
            <div className={styles.borderButton}>
                <NavLink to={`/ativos/criar/hardware`}>
                    <button className={styles.buttonCreate}>CRIAR AVISO</button>
                </NavLink> 
                <NavLink>
                <button className={styles.buttonHistory}>HISTORICO</button>
                </NavLink>
              
            </div>

            <div>{props.children}</div>
        </Container>
        
    )



}

export default UsuariosLt