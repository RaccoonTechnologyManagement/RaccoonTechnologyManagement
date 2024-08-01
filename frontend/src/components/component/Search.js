import styles from './Search.module.css'
import iconeInput from '../../img/lupa.png'

export const InfoSearch = ({setSearch})=>{
    return(
        <div className={styles.containerInput}>
            <input 
            type="text" 
            placeholder='Pesquisar' 
            onChange={(e)=>setSearch(e.target.value)}
            />
            <img src={iconeInput}></img>
        </div>
    )
}