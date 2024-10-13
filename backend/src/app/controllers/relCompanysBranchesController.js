import RelCompanysBranches from '../models/relCompanysBranches';
import Branches from '../models/branches';
import Companys from '../models/companys';
import * as Yup from 'yup'; // biblioteca de validação de campos

class relCompanysBranchesController {
    
    async index(req, res) {
        const relCompanysBranches = await RelCompanysBranches.findAll();
        return res.json(relCompanysBranches);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_company: Yup.string().required(),
            id_branch: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const branchExist = await Branches.findOne({
            where: { id: req.body.id_branch }
        });

        if(!branchExist){
            return res.status(400).json({ error: '1' });
        }

        const companyExist = await Companys.findOne({
            where: { id: req.body.id_company }
        });
    
        if(!companyExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelCompanysBranches.findOne({
            where: { id_branch: req.body.id_branch }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relCompanysBranches = await RelCompanysBranches.create({
            id_company: req.body.id_company,
            id_branch: req.body.id_branch
        });

        return res.json(relCompanysBranches);
    }
}

export default new relCompanysBranchesController();