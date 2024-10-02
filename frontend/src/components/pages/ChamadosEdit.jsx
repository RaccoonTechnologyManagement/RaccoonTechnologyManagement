import styles from '../pages/ChamadosEdit.module.css'
import Container from '../layout/Container'
import { useEffect, useRef } from 'react';
import iconeInput from '../../img/enviar-mensagem.png'


function ChamadosEdit(){
  const chatRef = useRef();

  const scrollBelow = () => {
    // Rola para baixo automaticamente
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    setTimeout(() => {
      scrollBelow();
    }, 50);
  }, []);

  return(
    <Container>
        <h2 className={styles.title}>COMENTÁRIOS</h2>
        <div className={styles.chat} ref={chatRef}>
          <div className={styles.messageBox}>
            <div className={styles.user}>
              <span>asd.dumontt</span>
            </div>
            <div className={styles.message}>
              Olá! Estou enfrentando problemas para acessar o sistema. Recebo uma mensagem de erro ao tentar fazer login. Pode me ajudar?
            </div>
          </div>
          <div className={styles.messageBoxLogged}>
            <div className={styles.userLogged}>
              <span>rya.hyggor</span>
            </div>
            <div className={styles.messageLogged}>
              <p>Claro, João! Vamos resolver isso. Primeiro, poderia me fornecer o seu nome de usuário e descrever o erro que está aparecendo? Assim, posso investigar melhor.</p>
            </div>
          </div>
          <div className={styles.messageBox}>
            <div className={styles.user}>
              <span>asd.dumontt</span>
            </div>
            <div className={styles.message}>
              <p>Olá! Estou enfrentando problemas para acessar o sistema. Recebo uma mensagem de erro ao tentar fazer login. Pode me ajudar?</p>
            </div>
          </div>
          <div className={styles.messageBoxLogged}>
            <div className={styles.userLogged}>
              <span>rya.hyggor</span>
            </div>
            <div className={styles.messageLogged}>
              <p>Claro, João! Vamos resolver isso. Primeiro, poderia me fornecer o seu nome de usuário e descrever o erro que está aparecendo? Assim, posso investigar melhor.</p>
            </div>
          </div>
        </div>
        <div className={styles.containerInput}>
            <input 
            type="text" 
            placeholder='Escrever um comentário...' 
            />
            <img src={iconeInput}></img>
        </div>
        
    </Container>
    )
}

export default ChamadosEdit

