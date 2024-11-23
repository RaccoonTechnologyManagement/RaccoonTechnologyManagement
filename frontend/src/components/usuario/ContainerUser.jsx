import SidebarUser from './SidebarUser'
import styles from './Container.module.css'

function ContainerUser(props){
   
    return(
        <>
            <SidebarUser/>
            <div className={styles.Container}>{props.children}</div>
        </>      

    ) 
}
export default ContainerUser