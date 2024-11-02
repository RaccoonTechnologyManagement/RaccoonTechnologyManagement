import styles from './UsuariosSearch.module.css'
import iconeInput from '../../img/lupa.png'

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
            <button className={styles.createUsers}>CRIAR USUÁRIO</button>
        </div>
    );
}
