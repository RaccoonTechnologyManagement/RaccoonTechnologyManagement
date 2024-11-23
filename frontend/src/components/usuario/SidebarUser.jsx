import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'
import logoChamados from '../../img/chamados.png'
import logoUser from '../../img/user.png'
import logoLogout from '../../img/logout.png'
import logoRacoom from '../../img/racoom.png'

function SidebarUser(){

    const infoSidebar = [
        {
            title: "Chamados",
            icon: logoChamados,
            link: "/user-chamados"
        }
    ]

    return(
        <nav className={styles.Sidebar}>
            <ul className={styles.SidebarList}>
                <div className={styles.SidebarHome}>
                    <div className={styles.BdLogo}>
                        <img src={logoRacoom}/>
                    </div>
                    <div className={styles.SidebarHomeRacoom}>
                        Raccoon Technology Managment
                    </div>
                </div>
                <div className={styles.bdRisk}><div className={styles.Risk}></div></div>
                
                {infoSidebar.map((value,index)=>{
                    return(
                        <NavLink 
                            to={value.link} 
                            className={styles.semSublinhado}
                            key={index}
                        >
                            <li 
                                className={styles.row}
                            >
                                <div className={styles.bd_Icon}>
                                    <img src={value.icon}/>
                                </div>
                                <div>
                                    {value.title}
                                </div>
                            </li>
                        </NavLink>
                    )
                })}
                
            </ul>
            <div className={styles.bdRisk}><div className={styles.Risk}></div></div>
            <div className={styles.SideBarFooter}>
                    <NavLink 
                        to={`/usuario`}
                        className={styles.semSublinhado}
                    >
                        <ul className={styles.rowFooter}>
                            <li className={styles.bd_Icon}>
                                <img src={logoUser}/>
                            </li>
                            <div className={styles.FooterUser}>
                                Perfil
                            </div>
                        </ul>
                    </NavLink>
                
                    <div 
                        className={styles.rowFooterLogout}
                        onClick={()=>{
                            window.location.pathname = `/`
                        }}
                    >
                        <div className={styles.bd_Icon}>
                            <img src={logoLogout}/>
                        </div>
                        <div className={styles.FooterLogout}>
                            Logout
                        </div>
                    </div>
                </div>
        </nav>
       
        
    )
}

export default SidebarUser