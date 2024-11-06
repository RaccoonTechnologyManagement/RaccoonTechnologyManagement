import CategoriesServer from '../models/categoriesServer';
import * as Yup from 'yup'; // biblioteca de validação de campos

class categoriesServerController {

    async index(req, res) {
        const categories = await CategoriesServer.findAll();
        return res.json(categories);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            category: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const categories = await CategoriesServer.create({
            category: req.body.category
        });

        return res.json(categories);
    }
}

export default new categoriesServerController();