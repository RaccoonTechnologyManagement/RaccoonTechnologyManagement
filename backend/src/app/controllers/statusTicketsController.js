import StatusTickets from '../models/statusTickets';
import * as Yup from 'yup'; // biblioteca de validação de campos

class StatusTicketsController {

    async index(req, res) {
        const statusTickets = await StatusTickets.findAll();
        return res.json(statusTickets);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            status: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const statusTickets = await StatusTickets.create({
            status: req.body.status
        });

        return res.json(statusTickets);
    }
}

export default new StatusTicketsController();