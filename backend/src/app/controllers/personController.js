import Person from '../models/person';
import RelCategorysPersons from '../models/relCategorysPersons';
import CategorysPersons from '../models/categorysPersons';
import RelPersonsDepartaments from '../models/relPersonsDepartaments';
import RelBranchesDepartaments from '../models/relBranchesDepartaments';
import RelCompanysBranches from '../models/relCompanysBranches';
import Branches from '../models/branches';
import Departaments from '../models/departaments';
import Companys from '../models/companys';
import User from '../models/user';
import * as Yup from 'yup';

import { formatResponsePerson } from '../../functions/functions';

class personController {

    async index(req, res) {
        const persons = await Person.findOne({
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

    async getPerson(req, res) {

        const include = {
            include: [
                {
                    model: RelCategorysPersons,
                    as: 'category',
                    include: [{
                        model: CategorysPersons,
                        as: 'category',
                        attributes: ['category']
                    }]
                },
                {
                    model: RelPersonsDepartaments,
                    as: 'departaments',
                    include: [{
                        model: Departaments,
                        as: 'departaments',
                        attributes: ['department_name'],
                        include: [{
                            model: RelBranchesDepartaments,
                            as: 'relDepartament',
                            include: [{
                                model: Branches,
                                as: 'branch',
                                attributes: ['branch_name'],
                                include: [{
                                    model: RelCompanysBranches,
                                    as: 'relBranch',
                                    include: [{
                                        model: Companys,
                                        as: 'company',
                                        attributes: ['corporate_name']
                                    }]
                                }]
                            }]
                        }]
                    }]
                },
                {
                    model: User,
                    as: 'user',
                }
            ]
        };

        const persons = await Person.findOne({
            ...include,
            where: {
                id_user: req.userId,
            }
        });

        console.log(persons);

        return res.json(formatResponsePerson(persons));
    }
}

export default new personController();