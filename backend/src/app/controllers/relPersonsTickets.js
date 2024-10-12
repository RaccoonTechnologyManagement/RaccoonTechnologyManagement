import Person from '../models/person';
import RelPersonsTickets from '../models/relPersonsTickets';
import Ticket from '../models/ticket';

class relPersonsTicketsController {

    async index(req, res) {
        const relPersonsTickets = await RelPersonsTickets.findAll();
        return res.json(relPersonsTickets);
    }

    async store(req, res) {

        const personCreatorExist = await Person.findOne({
            where: { id: req.body.id_person_creator }
        });

        if(!personCreatorExist){
            return res.status(400).json({ error: '1' });
        }

        const personAccountableExist = await Person.findOne({
            where: { id: req.body.id_person_accountable }
        });

        if(!personAccountableExist){
            return res.status(400).json({ error: '2' });
        }

        const ticketExist = await Ticket.findOne({
            where: { id: req.body.id_ticket }
        });

        if(!ticketExist){
            return res.status(400).json({ error: '3' });
        }

        const ticketPersonExist = await RelPersonsTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(ticketPersonExist){
            return res.status(400).json({ error: '4' });
        }

        const relPersonsTickets = await RelPersonsTickets.create({
            id_ticket: req.body.id_ticket,
            id_person_creator: req.body.id_person_creator,
            id_person_accountable: req.body.id_person_accountable
        });

        return res.json(relPersonsTickets);
    }
}

export default new relPersonsTicketsController();