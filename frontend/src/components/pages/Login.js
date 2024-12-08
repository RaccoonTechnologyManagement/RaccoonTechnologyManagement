import axios from 'axios';
import styles from './Login.module.css'
import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import logoRacoom from '../../img/racoom.png'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { getInfoPerson, loginPerson } from '../data/api';

export const Login = ()=>{

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function pessoa()
    {
      try
      {
        return getInfoPerson();
      }
      catch(erro)
      {
          return [];
      }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = {
            email: user,
            password: password,
        };

        loginPerson(data)
        const info = await pessoa();
        if(info.category == "Técnico" || info.category == "adm")
        {
            navigate('/chamados');
        }
        else
        {
            navigate('/user-chamados');
        }
      };

    return(
        <div className={styles.mainContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.logoRaccoon}>
                    <div className={styles.bdLogoRaccoon}>
                        <img src={logoRacoom}/>
                    </div>
                    <p>Raccoon Technology Management</p>
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