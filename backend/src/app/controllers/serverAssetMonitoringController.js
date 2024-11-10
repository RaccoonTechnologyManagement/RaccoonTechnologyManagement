import ServerAssetMonitoring from '../models/serverAssetMonitoring';
import Branches from '../models/branches';
import RelCompanysBranches from '../models/relCompanysBranches';
import Companys from '../models/companys';
import CategoriesServer from '../models/categoriesServer';
import ServerAsset from '../models/serverAsset';
import * as Yup from 'yup'; // biblioteca de validação de campos

import { formatResponseServerMonitoring } from '../../functions/functions';
import Sequelize from 'sequelize';

class serverAssetMonitoring {

    async index(req, res) {

        const include = {
            include: [
                {
                    model: ServerAsset,
                    as: 'serverAsset',
                    where: {
                        monitor: true
                    },
                    include: [{
                        model: Branches,
                        as: 'serverBranch',
                        attributes: ['branch_name'],
                        include: [{
                            model: RelCompanysBranches,
                            as: 'relBranch',
                            include: [{
                                model: Companys,
                                as: 'company',
                                attributes: ['name']
                            }]
                        }]
                    }]
                },
            ]
        };

        const monitoring = await ServerAssetMonitoring.findAll({
            ...include,
        });

        return res.json(formatResponseServerMonitoring(monitoring));
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            id_server: Yup.string().required(),
            status: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const monitoring = await ServerAssetMonitoring.create({
            id_server: req.body.id_server,
            status: req.body.status,
            alert: req.body.alert,
        });

        return res.json(monitoring);
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            id_server: Yup.string().required(),
            status: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const monitoring = await ServerAssetMonitoring.create({
            id_server: req.body.id_server,
            status: req.body.status,
            alert: req.body.alert,
        });

        return res.json(monitoring);
    }
}

export default new serverAssetMonitoring();