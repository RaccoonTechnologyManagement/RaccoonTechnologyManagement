import Container from './Container'
import { NavLink } from 'react-router-dom';
import styles from './CriarAtivo.module.css'

function CriarAtivo (props){
    return(
        <Container>
            <div id="selecionado" className={styles.notBorderButton}>
                <NavLink to={`/ativos/criar/hardware`}>
                    <button>HARDWARE</button>
                </NavLink> 
                <NavLink to={`/ativos/criar/servidor`}>
                    <button>SERVIDORES</button>
                </NavLink>

                {/*Ess trecho comentado direciona para criação dos ativos, para aticar tbm mecher nas rotas no App.js*/}
                {/*s
               <NavLink to={`/ativos/criar/software`}> 
                    <button>SOFTWARE</button>
                </NavLink>
                <NavLink to={`/ativos/criar/licenca`}>
                    <button>LICENÇAS</button>
                </NavLink>  
                */}


            </div>

            <div>{props.children}</div>
        </Container>
        
    )



}

export default CriarAtivo