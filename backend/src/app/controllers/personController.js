import Person from '../models/person';
import * as Yup from 'yup';

class personController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            lastname: Yup.string().required(),
            telephone: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha ao cadastrar.'});
        }

        const persons = await Person.create({
            id_user: req.userId,
            name: req.body.name,
            lastname: req.body.lastname,
            telephone: req.body.telephone,
            office: req.body.office
        });

        return res.json(persons);
    }
}

export default new personController();