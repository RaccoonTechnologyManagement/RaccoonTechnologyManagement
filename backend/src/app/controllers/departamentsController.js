import Departaments from '../models/departaments';
import * as Yup from 'yup'; // biblioteca de validação de campos

class departamentsController {
    
    async index(req, res) {
        const departament = await Departaments.findAll();
        return res.json(departament);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            department_name: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const departament = await Departaments.create({
            department_name: req.body.department_name,
            description: req.body.description
        });

        return res.json(departament);
    }
}

export default new departamentsController();