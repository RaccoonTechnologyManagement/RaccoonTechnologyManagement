import PrioritysTickets from '../models/prioritysTickets';
import * as Yup from 'yup'; // biblioteca de validação de campos

class prioritysTicketsController {

    async index(req, res) {
        const prioritysTickets = await PrioritysTickets.findAll();
        return res.json(prioritysTickets);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            priority: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const categoryTicket = await PrioritysTickets.create({
            priority: req.body.priority
        });

        return res.json(categoryTicket);
    }
}

export default new prioritysTicketsController();