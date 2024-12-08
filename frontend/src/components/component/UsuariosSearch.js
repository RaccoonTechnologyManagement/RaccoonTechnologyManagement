import styles from './UsuariosSearch.module.css'
import iconeInput from '../../img/lupa.png'
import { NavLink } from 'react-router-dom';

export const InfoSearch = ({ setSearch }) => {
    return (
        <div className={styles.container}>
            <div className={styles.containerInput}>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img src={iconeInput} alt="Ícone de pesquisa" />
            </div>
            <NavLink to={`/criar-usuario`}>
            <button className={styles.createUsers}>CRIAR USUÁRIO</button>
            </NavLink>
        </div>
    );
}
