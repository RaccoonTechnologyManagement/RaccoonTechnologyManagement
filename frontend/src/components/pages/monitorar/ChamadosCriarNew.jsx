import styles from '../pages/ChamadosCriar.module.css';
import { createTicket, getInfoPerson } from '../data/api';
import Container from '../layout/Container';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ChamadosCriar() {
    const [ticket, setTicket] = useState({
        titulo: '',
        user: '', // Já puxa de acordo com o usuário logado
        prioridade: '',
        categoria: '',
        data: '', // Puxar data atual
        dataprazo: '', // Puxar data atual + dias de prazo
        descricao: '',
        company: { company: '', departament: { name: '' }, branch: '' } // Inicializando com um objeto vazio
    });

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function carregarInfoPessoa() {
        try {
            let person = await getInfoPerson();
            return person;
        } catch (erro) {
            return {};
        }
    }

    async function criarTicket() {
        try {
            let data = {
                title: ticket.titulo,
                description: ticket.descricao,
                id_category: ticket.categoria,
                id_priority: ticket.prioridade,
                id_departament: ticket.company.departament.id // Aqui pode ocorrer erro se 'company' for undefined
            };

            await createTicket(data);  // Chama a API para criar o ticket

            setTimeout(() => {
                navigate('/chamados/abertos');  // Redireciona após 3 segundos
            }, 3000);
        } catch (erro) {
            console.error('Erro ao criar o ticket:', erro);
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
            descricao: '',
            company: { company: '', departament: { name: '' }, branch: '' } // Resetando company para um objeto vazio
        });
        navigate('/chamados/abertos'); // Redireciona para outra página
    };

    useEffect(() => {
        const inserirInfoPessoa = async () => {
            const info = await carregarInfoPessoa();
            if (info) {
                setTicket(prevTicket => ({
                    ...prevTicket,
                    company: info.company || { company: '', departament: { name: '' }, branch: '' },
                    user: info.user || '',
                    // Preencha outros campos conforme necessário
                }));
            }
            setIsLoading(false);
        };

        inserirInfoPessoa();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { titulo, empresa, departamento, sede, prioridade, categoria, descricao } = ticket;

        // Validação dos campos obrigatórios
        let validationErrors = {};
        if (!titulo) validationErrors.titulo = 'Campo obrigatório';
        if (!prioridade) validationErrors.prioridade = 'Campo obrigatório';
        if (!categoria) validationErrors.categoria = 'Campo obrigatório';
        if (!descricao) validationErrors.descricao = 'Campo obrigatório';

        // Se houver erros de validação, exibe-os e impede o redirecionamento
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Define os erros de validação
            return; // Impede a execução do redirecionamento
        }

        // Caso não haja erros, cria o ticket
        setShowPopup(true); // Exibe o popup

        // Cria o chamado (fazendo a chamada à API)
        await criarTicket();

        // Limpa os campos após o envio
        setTicket({
            titulo: '',
            empresa: ticket.empresa, // Não limpa os dados da empresa, departamento e sede
            departamento: ticket.departamento,
            sede: ticket.sede,
            user: '',
            prioridade: '',
            categoria: '',
            data: '',
            dataprazo: '',
            descricao: '',
            company: { company: '', departament: { name: '' }, branch: '' } // Resetando para evitar erros de acesso
        });
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

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
                                value={ticket.company?.company || ''} // Protege contra undefined
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>DEPARTAMENTO</label>
                            <input
                                type="text"
                                name="departamento"
                                value={ticket.company?.departament?.name || ''} // Protege contra undefined
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className={styles.ticketInputs}>
                            <label className={styles.title}>SEDE</label>
                            <input
                                type="text"
                                name="sede"
                                value={ticket.company?.branch || ''} // Protege contra undefined
                                onChange={handleChange}
                                disabled
                            />
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
                                <button type="submit" className={styles.createButton}>CRIAR</button> {/* Remover onClick aqui */}
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
