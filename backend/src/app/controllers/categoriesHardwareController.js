import CategoriesHardware from '../models/categoriesHardware';
import * as Yup from 'yup'; // biblioteca de validação de campos

class categoriesHardwareController {

    async index(req, res) {
        const categories = await CategoriesHardware.findAll();
        return res.json(categories);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            category: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const categories = await CategoriesHardware.create({
            category: req.body.category
        });

        return res.json(categories);
    }
}

export default new categoriesHardwareController();