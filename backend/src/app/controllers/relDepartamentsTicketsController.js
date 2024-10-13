import RelDepartamentsTickets from '../models/relDepartamentsTickets';
import Departaments from '../models/departaments';
import Ticket from '../models/ticket';
import * as Yup from 'yup'; // biblioteca de validação de campos

class relPersonsDepartamentsController {
    
    async index(req, res) {
        const relDepartamentsTickets = await RelDepartamentsTickets.findAll();
        return res.json(relDepartamentsTickets);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_departament: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const ticketExist = await Ticket.findOne({
            where: { id: req.body.id_ticket }
        });

        if(!ticketExist){
            return res.status(400).json({ error: '1' });
        }

        const departamentExist = await Departaments.findOne({
            where: { id: req.body.id_departament }
        });
    
        if(!departamentExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelDepartamentsTickets.findOne({
            where: { id_ticket: req.body.id_ticket }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relDepartamentsTickets = await RelDepartamentsTickets.create({
            id_ticket: req.body.id_ticket,
            id_departament: req.body.id_departament
        });

        return res.json(relDepartamentsTickets);
    }
}

export default new relPersonsDepartamentsController();