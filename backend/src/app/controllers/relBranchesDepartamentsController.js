import RelBranchesDepartaments from '../models/relBranchesDepartaments';
import Branches from '../models/branches';
import Departaments from '../models/departaments';
import * as Yup from 'yup'; // biblioteca de validação de campos

class relBranchesDepartamentsController {
    
    async index(req, res) {
        const relBranchesDepartaments = await RelBranchesDepartaments.findAll();
        return res.json(relBranchesDepartaments);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_branch: Yup.string().required(),
            id_departament: Yup.string().required(),
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

        const departamentExist = await Departaments.findOne({
            where: { id: req.body.id_departament }
        });
    
        if(!departamentExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelBranchesDepartaments.findOne({
            where: { id_departament: req.body.id_departament }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relBranchesDepartaments = await RelBranchesDepartaments.create({
            id_branch: req.body.id_branch,
            id_departament: req.body.id_departament
        });

        return res.json(relBranchesDepartaments);
    }
}

export default new relBranchesDepartamentsController();