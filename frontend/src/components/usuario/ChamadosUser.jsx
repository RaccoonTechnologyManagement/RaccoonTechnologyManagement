import ContainerUser from './ContainerUser'
import styles from './Chamados.module.css'
import { NavLink } from 'react-router-dom';

function ChamadosUser(props){


    return(
        <ContainerUser>
            <h2 className={styles.title}>CHAMADOS</h2>
            <div className={styles.borderButton}>
                <NavLink to={`/user-chamados/criar`}>
                    <button>CRIAR CHAMADO</button>
                </NavLink> 
                <NavLink to={`/user-chamados/historico`}>
                    <button className={styles.bdGray}>HISTÓRICO</button>
                </NavLink> 
            </div>
            <div id="selecionado" className={styles.notBorderButton}>
                <NavLink to={`/user-chamados/meus-chamados`}>
                    <button>MEUS CHAMADOS</button>
                </NavLink> 
            </div>
            <div>{props.children}</div>
        </ContainerUser>
        
    )
}

export default ChamadosUser