import Branches from '../models/branches';
import * as Yup from 'yup'; // biblioteca de validação de campos

class branchesController {
    
    async index(req, res) {
        const branches = await Branches.findAll();
        return res.json(branches);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            branch_name: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const branch = await Branches.create({
            branch_name: req.body.branch_name,
            description: req.body.description,
            website: req.body.website,
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
            neighborhood: req.body.neighborhood,
            address: req.body.address,
            postal_code: req.body.postal_code
        });

        return res.json(branch);
    }
}

export default new branchesController();