import RelStatusTickets from '../models/relStatusTickets';
import StatusTickets from '../models/statusTickets';
import Ticket from '../models/ticket';

import * as Yup from 'yup'; // biblioteca de validação de campos

class relPrioritysTicketsController {

    async index(req, res) {
        const relStatusTickets = await RelStatusTickets.findAll();
        return res.json(relStatusTickets);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_status: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const ticketExist = await Ticket.findOne({
            where: { id: req.body.id_ticket }
        });

        if(!ticketExist){
            return res.status(400).json({ error: '1' });
        }

        const statusTicket = await StatusTickets.findOne({
            where: { id: req.body.id_status }
        });
    
        if(!statusTicket){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelStatusTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relStatusTickets = await RelStatusTickets.create({
            id_ticket: req.body.id_ticket,
            id_status: req.body.id_status,
        });

        return res.json(relStatusTickets);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_status: Yup.string().required()
        });
    
        // Valida o schema
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const ticketExist = await Ticket.findOne({
            where: { id: req.body.id_ticket }
        });

        if(!ticketExist){
            return res.status(400).json({ error: '1' });
        }

        const statusTicket = await StatusTickets.findOne({
            where: { id: req.body.id_status }
        });
    
        if(!statusTicket){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelStatusTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(!relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        // Tenta atualizar o relacionamento com base nas condições do where
        const {id, id_category, id_ticket} = await RelStatusTickets.update(
            { id_status: req.body.id_status }, // Novos valores
            { where: { id_ticket: req.body.id_ticket }} // Condições para o where
        );

        return res.json({ok: true});
    }

    async delete(req, res) {

        const schema = Yup.object().shape({
            id_ticket: Yup.string().required()
        });
    
        // Valida o schema
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const ticketExist = await Ticket.findOne({
            where: { id: req.body.id_ticket }
        });

        if(!ticketExist){
            return res.status(400).json({ error: '1' });
        }

        const relationshipExist = await RelCategorysTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(!relationshipExist){
            return res.status(400).json({ error: '2' });
        }

        const deletedRows = await RelCategorysTickets.destroy({
            where: {
                id_ticket: req.body.id_ticket
            }
        });

        return res.json({ok: true});
    }
}

export default new relPrioritysTicketsController();