import styles from './Login.module.css'
import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import logoRacoom from '../../img/racoom.png'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";



export const Login = ()=>{

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        alert("Logando: (teste) " + "\n" + "Usuário: "+ user + "\n" + "Senha: "+ password)
        navigate('/chamados')
    }

    return(
        <div className={styles.mainContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.logoRaccoon}>
                    <div className={styles.bdLogoRaccoon}>
                        <img src={logoRacoom}/>
                    </div>
                    <p>Raccon Technology Management</p>
                </div>
                <h3>Bem-vindo de volta!</h3>
                <span>ESTAVAMOS ANSIOSOS POR SUA VOLTA "MENINO DO T.I"</span>
                <div className={styles.bdInputs}>
                    <div className={styles.bdInput}>
                        <input 
                            type="text" 
                            placeholder='USUÁRIO'
                            onChange={(e)=> setUser(e.target.value)}
                        />
                        <FaUserAlt className={styles.iconInput}/>
                    </div>
                    <div className={styles.bdInput}>
                        <input 
                            type="password"
                            placeholder='SENHA' 
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <RiLockPasswordLine className={styles.iconInput}/>
                    </div>
                </div>
                <input
                    className={styles.inputSubmit}
                    type='submit'
                    value={'ENVIAR'}
                />
                <NavLink 
                to={'/login/recuperar-senha'}
                className={styles.clickLink}
                >
                    <p>ESQUECI MINHA SENHA</p>
                </NavLink>
            </form>
        </div>
    )
}