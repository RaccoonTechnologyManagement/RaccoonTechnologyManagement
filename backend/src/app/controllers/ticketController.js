import Ticket from '../models/ticket';
import * as Yup from 'yup'; // biblioteca de validação de campos

class ticketController {

    async store(req, res) {

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required() 
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const ticket = await Ticket.create({
            title: req.body.title,
            description: req.body.description,
        });

        return res.json(ticket);
    }
}

export default new ticketController();