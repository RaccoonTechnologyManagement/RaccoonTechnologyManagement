import styles from '../pages/ChamadosCriar.module.css';
import { createTicket } from '../data/api'
import Container from '../layout/Container';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function ChamadosCriar() {
    const [ticket, setTicket] = useState({
        titulo: '',
        empresa: 'Sigma Saúde e Bem-Estar Ltda', //Já puxa de acordo com o usuario logado
        departamento: '1', //Já puxa de acordo com o usuario logado
        sede: 'Filial São Paulo', //Já puxa de acordo com o usuario logado
        user: '', //Já puxa de acordo com o usuario logado
        prioridade: '',
        categoria: '',
        data: '', //Puxar data atual
        dataprazo: '', //Puxar data atual + dias de prazo
        descricao: ''
    });

    const navigate = useNavigate();
    
    async function criarTicket()
    {
      try
      {
        let data = {
          title: ticket.titulo,
          description: ticket.descricao,
          id_category: ticket.categoria,
          id_priority: ticket.prioridade,
          id_departament: ticket.departamento
        }
  
        let ticketCriado = await createTicket(data);
  
        setTimeout(() => {
          navigate('/chamados/abertos');
        }, 3000);
      }
      catch(erro)
      {
  
      }
    }

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar o popup

    const [errors, setErrors] = useState({}); // Estado para armazenar erros de validação

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket({ ...ticket, [name]: value });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setErrors({}); // Limpa os erros ao cancelar
        setTicket({
            titulo: '',
            empresa: '',
            departamento: '',
            sede: '',
            user: '',
            prioridade: '',
            categoria: '',
            data: '',
            dataprazo: '',
            status: '',
            descricao: ''
        });
        window.location.href = '/chamados/abertos';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { titulo, empresa, departamento, sede, prioridade, categoria, descricao } = ticket;

        // Validação dos campos obrigatórios
        let validationErrors = {};
        if (!titulo) validationErrors.titulo = 'Campo obrigatório';
        if (!empresa) validationErrors.empresa = 'Campo obrigatório';
        if (!departamento) validationErrors.departamento = 'Campo obrigatório';
        if (!sede) validationErrors.sede = 'Campo obrigatório';
        if (!prioridade) validationErrors.prioridade = 'Campo obrigatório';
        if (!categoria) validationErrors.categoria = 'Campo obrigatório';
        if (!descricao) validationErrors.descricao = 'Campo obrigatório';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Define erros de validação
            return;
        }

        // lógica para enviar os dados do formulário
        setShowPopup(true); // Exibe o popup


        // Limpa os campos após o envio
        setTicket({
            titulo: '',
            empresa: '',
            departamento: '',
            sede: '',
            user: '',
            prioridade: '',
            categoria: '',
            data: '',
            dataprazo: '',
            status: '',
            descricao: ''
        });
        
        setTimeout(() => {
          setShowPopup(false);
          window.location.href = '/chamados/abertos';
      }, 3000);
    };

    return (
        <Container>
            <div className={styles.mainContainerCenter}>
                <div className={styles.containerCenter}>
                    <div className={styles.ticketNumber}>
                        <h2>CRIAR CHAMADO</h2>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.formTicket}>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>TÍTULO</label>
                            <input
                                type="text"
                                name="titulo"
                                value={ticket.titulo}
                                onChange={handleChange}
                                className={errors.titulo ? styles.errorInput : ''}
                            />
                            {errors.titulo && <span className={styles.errorText}>{errors.titulo}</span>}
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>PRIORIDADE</label>
                            <select name="prioridade" onChange={handleChange} className={errors.prioridade ? styles.errorInput : ''}>
                                <option value="">Selecione</option>
                                <option value="1">Baixa</option>
                                <option value="2">Média</option>
                                <option value="3">Alta</option>
                            </select>
                            {errors.prioridade && <span className={styles.errorText}>{errors.prioridade}</span>}
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>EMPRESA</label>
                            <input
                                type="text"
                                name="empresa"
                                value={ticket.empresa}
                                onChange={handleChange}
                                className={errors.empresa ? styles.errorInput : ''}
                                disabled
                            />
                            {errors.empresa && <span className={styles.errorText}>{errors.empresa}</span>}
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>DEPARTAMENTO</label>
                            <input
                                type="text"
                                name="departamento"
                                value={ticket.departamento}
                                onChange={handleChange}
                                className={errors.departamento ? styles.errorInput : ''}
                                disabled
                            />
                            {errors.departamento && <span className={styles.errorText}>{errors.departamento}</span>}
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>SEDE</label>
                            <input
                                type="text"
                                name="sede"
                                value={ticket.sede}
                                onChange={handleChange}
                                className={errors.sede ? styles.errorInput : ''}
                                disabled
                            />
                            {errors.sede && <span className={styles.errorText}>{errors.sede}</span>}
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>CATEGORIA</label>
                            <select name="categoria" onChange={handleChange} className={errors.categoria ? styles.errorInput : ''}>
                                <option value="">Selecione</option>
                                <option value="1">Hardware</option>
                                <option value="2">Rede</option>
                                <option value="3">Servidor</option>
                                <option value="4">Software</option>
                            </select>
                            {errors.categoria && <span className={styles.errorText}>{errors.categoria}</span>}
                        </div>
                        <div className={styles.assetFormGroupFullWidth}>
                            <label htmlFor="descricao">DESCRIÇÃO</label>
                            <textarea
                                name="descricao"
                                rows="7"
                                className={`${styles.fullWidth} ${errors.descricao ? styles.errorInput : ''}`}
                                onChange={handleChange}
                                value={ticket.descricao}
                            ></textarea>
                            {errors.descricao && <span className={styles.errorText}>{errors.descricao}</span>}
                        </div>
                        <div className={styles.buttonGroup}>
                            <div className={styles.boxRightButtonGroup}>
                                <button
                                    type="submit"
                                    name="criar"
                                    value="CRIAR"
                                    className={styles.createButton}
                                    onClick={() => {
                                        criarTicket()
                                      }}
                                >CRIAR</button>
                                <button className={styles.cancelButton} onClick={handleCancel}>CANCELAR</button>
                            </div>
                        </div>
                    </form>
                    {showPopup && (
                        <div className={styles.popup}>
                            Chamado criado com sucesso!
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default ChamadosCriar;
