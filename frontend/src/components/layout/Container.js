import Sidebar from './Sidebar'
import styles from './Container.module.css'

function Container(props){
   
    return(
        <>
            <Sidebar/>
            <div className={styles.Container}>{props.children}</div>
        </>      

    ) 
}
export default Container