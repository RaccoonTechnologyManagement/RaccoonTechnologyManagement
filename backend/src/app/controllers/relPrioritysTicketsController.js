import RelPrioritysTickets from '../models/relPrioritysTickets';
import PrioritysTickets from '../models/prioritysTickets';
import Ticket from '../models/ticket';

import * as Yup from 'yup'; // biblioteca de validação de campos

class relPrioritysTicketsController {

    async index(req, res) {
        const relPrioritysTickets = await RelPrioritysTickets.findAll();
        return res.json(relPrioritysTickets);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_priority: Yup.string().required()
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

        const priorityTicket = await PrioritysTickets.findOne({
            where: { id: req.body.id_priority }
        });
    
        if(!priorityTicket){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelPrioritysTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relPrioritysTickets = await RelPrioritysTickets.create({
            id_ticket: req.body.id_ticket,
            id_priority: req.body.id_priority,
        });

        return res.json(relPrioritysTickets);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_priority: Yup.string().required()
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

        const priorityExist = await PrioritysTickets.findOne({
            where: { id: req.body.id_priority }
        });
    
        if(!priorityExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelPrioritysTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(!relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        // Tenta atualizar o relacionamento com base nas condições do where
        const {id, id_category, id_ticket} = await RelPrioritysTickets.update(
            { id_priority: req.body.id_priority }, // Novos valores
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