import Companys from '../models/companys';
import * as Yup from 'yup'; // biblioteca de validação de campos

class companysController {
    
    async index(req, res) {
        const companys = await Companys.findAll();
        return res.json(companys);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            corporate_name: Yup.string().required(),
            metier: Yup.string().required() 
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const company = await Companys.create({
            name: req.body.name,
            corporate_name: req.body.corporate_name,
            metier: req.body.metier
        });

        return res.json(company);
    }
}

export default new companysController();