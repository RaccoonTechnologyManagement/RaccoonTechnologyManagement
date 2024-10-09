

import Container from './Container'
import styles from './Ativos.module.css'
import { NavLink } from 'react-router-dom';

function UsuariosLt (props){
    return(
        <Container>

            <h2 className={styles.title}>USUARIOS</h2>
            <div className={styles.borderButton}>
                <NavLink to={`/ativos/criar/hardware`}>
                    <button>CRIAR AVISO</button>
                </NavLink> 
              
            </div>

            <div>{props.children}</div>
        </Container>
        
    )



}

export default UsuariosLt