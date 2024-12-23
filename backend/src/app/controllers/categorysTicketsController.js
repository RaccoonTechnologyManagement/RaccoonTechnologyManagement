import CategorysTickets from '../models/categorysTickets';
import * as Yup from 'yup'; // biblioteca de validação de campos

class categorysTicketsController {

    async index(req, res) {
        const categorysTickets = await CategorysTickets.findAll();
        return res.json(categorysTickets);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            category: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const categoryTicket = await CategorysTickets.create({
            category: req.body.category
        });

        return res.json(categoryTicket);
    }
}

export default new categorysTicketsController();