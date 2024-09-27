import RelCategorysTickets from '../models/relCategorysTickets';
import Ticket from '../models/ticket';
import CategorysTickets from '../models/categorysTickets';

import * as Yup from 'yup'; // biblioteca de validação de campos

class relCategorysTicketsController {

    async index(req, res) {
        const relCategorysTickets = await RelCategorysTickets.findAll();
        return res.json(relCategorysTickets);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_category: Yup.string().required()
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

        const categoryExist = await CategorysTickets.findOne({
            where: { id: req.body.id_category }
        });
    
        if(!categoryExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelCategorysTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relCategorysTickets = await RelCategorysTickets.create({
            id_ticket: req.body.id_ticket,
            id_category: req.body.id_category,
        });

        return res.json(relCategorysTickets);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_category: Yup.string().required()
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

        const categoryExist = await CategorysTickets.findOne({
            where: { id: req.body.id_category }
        });
    
        if(!categoryExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelCategorysTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(!relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        // Tenta atualizar o relacionamento com base nas condições do where
        const {id, id_category, id_ticket} = await RelCategorysTickets.update(
            { id_category: req.body.id_category }, // Novos valores
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

export default new relCategorysTicketsController();