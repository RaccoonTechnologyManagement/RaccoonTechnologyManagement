import SubCategoriesHardware from '../models/subcategoriesHardware';
import * as Yup from 'yup'; // biblioteca de validação de campos

class subCategoriesHardwareController {

    async index(req, res) {
        const subCategories = await SubCategoriesHardware.findAll();
        return res.json(subCategories);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_category: Yup.string().required(),
            subcategory: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const subCategories = await SubCategoriesHardware.create({
            id_category: req.body.id_category,
            subcategory: req.body.subcategory,
        });

        return res.json(subCategories);
    }
}

export default new subCategoriesHardwareController();