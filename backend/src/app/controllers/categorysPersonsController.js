import CategorysPersons from '../models/categorysPersons';
import * as Yup from 'yup'; // biblioteca de validação de campos

class categorysPersonsController {

    async index(req, res) {
        const categorysPerson = await CategorysPersons.findAll();
        return res.json(categorysPerson);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            category: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const categoryTicket = await CategorysPersons.create({
            category: req.body.category
        });

        return res.json(categoryTicket);
    }
}

export default new categorysPersonsController();