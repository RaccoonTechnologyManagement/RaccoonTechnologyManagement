import Person from '../models/person';
import * as Yup from 'yup';

class personController {

    async index(req, res) {
        const persons = await Person.findAll({
            where: { id_user: req.userId }
        });

        return res.json(persons);
    }

    async getPersonByUserId(userId) {
        const persons = await Person.findAll({
            where: { id_user: userId }
        });

        return persons[0].dataValues.id;
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            lastname: Yup.string().required(),
            telephone: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Preencha os campos obrigatórios' });
        }

        const userExist = await Person.findOne({
            where: {id_user: req.userId }
        });

        if(userExist){
            return res.status(400).json({ error: 'Usuario já existe '})
        }

        const persons = await Person.create({
            id_user: req.userId,
            name: req.body.name,
            lastname: req.body.lastname,
            telephone: req.body.telephone,
            office: req.body.office,
            profile_photo: req.body.profile_photo
        });

        return res.json(persons);
    }
}

export default new personController();