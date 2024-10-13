import RelPersonsDepartaments from '../models/relPersonsDepartaments';
import Departaments from '../models/departaments';
import Person from '../models/person';
import * as Yup from 'yup'; // biblioteca de validação de campos

class relPersonsDepartamentsController {
    
    async index(req, res) {
        const relPersonsDepartaments = await RelPersonsDepartaments.findAll();
        return res.json(relPersonsDepartaments);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_person: Yup.string().required(),
            id_departament: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const personExist = await Person.findOne({
            where: { id: req.body.id_person }
        });

        if(!personExist){
            return res.status(400).json({ error: '1' });
        }

        const departamentExist = await Departaments.findOne({
            where: { id: req.body.id_departament }
        });
    
        if(!departamentExist){
            return res.status(400).json({ error: '2' });
        }

        const relationshipExist = await RelPersonsDepartaments.findOne({
            where: { id_person: req.body.id_person }
        });

        if(relationshipExist){
            return res.status(400).json({ error: '3' });
        }

        const relPersonsDepartaments = await RelPersonsDepartaments.create({
            id_person: req.body.id_person,
            id_departament: req.body.id_departament
        });

        return res.json(relPersonsDepartaments);
    }
}

export default new relPersonsDepartamentsController();