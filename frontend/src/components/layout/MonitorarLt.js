import Container from './Container'
import styles from './MonitorarLt.module.css'
import { NavLink } from 'react-router-dom';

function MonitorarLt (props) {
    return  (
        <Container>
                <div id="selecionado" className={styles.notBorderButton}>
                <NavLink to={`/monitorar/visaogeral`}>
                    <button>VISÃO GERAL</button>
                </NavLink> 
                <NavLink to={`/monitorar/GerarTokenMonitoramento`}>
                    <button>INTEGRAÇÃO API</button>
                </NavLink>                                             
            </div>
            <div>{props.children}</div>
        </Container>
    )
}

export default MonitorarLt