import RelCategorysTickets from '../models/relCategorysTickets';
import * as Yup from 'yup'; // biblioteca de validação de campos

class relCategorysTicketsController {

    async index(req, res) {
        const persons = await Person.findAll({
            where: { id_user: req.userId }
        });

        return res.json(persons);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_ticket: Yup.string().required(),
            id_category: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }


        const relCategorysTickets = await RelCategorysTickets.create({
            id_ticket: req.body.id_ticket,
            id_category: req.body.id_category,
        });

        return res.json(relCategorysTickets);
    }
}

export default new relCategorysTicketsController();