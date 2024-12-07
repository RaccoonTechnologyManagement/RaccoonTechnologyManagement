import ServerAsset from '../models/serverAsset';
import Branches from '../models/branches';
import RelCompanysBranches from '../models/relCompanysBranches';
import Companys from '../models/companys';
import StatusAsset from '../models/statusAsset';
import CategoriesServer from '../models/categoriesServer';
import ServerAssetMonitoring from '../models/serverAssetMonitoring';
import * as Yup from 'yup'; // biblioteca de validação de campos

import { formatResponseServerAsset, formatResponseOneServerAsset } from '../../functions/functions';
class serverAssetController {

    async index(req, res) {

        const include = {
            include: [
                {
                    model: StatusAsset,
                    as: 'serverStatusAsset',
                    attributes: ['status'],
                },
                {
                    model: CategoriesServer,
                    as: 'categoryServer',
                    attributes: ['category'],
                },
                {
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
            };

        const asset = await ServerAsset.findAll({
            ...include
        });

        return res.json(formatResponseServerAsset(asset));
    }

    async getOneServerAsset(req, res) {

        const patrimonyNumber = req.query.patrimony_number;

        const include = {
            include: [
                {
                    model: StatusAsset,
                    as: 'serverStatusAsset',
                    attributes: ['status'],
                },
                {
                    model: CategoriesServer,
                    as: 'categoryServer',
                    attributes: ['category'],
                },
                {
                    model: Branches,
                    as: 'serverBranch',
                    attributes: ['id'],
                    include: [{
                        model: RelCompanysBranches,
                        as: 'relBranch',
                        include: [{
                            model: Companys,
                            as: 'company',
                            attributes: ['id']
                        }]
                    }]
                }]
            };

        const asset = await ServerAsset.findAll({
            ...include,
            where: {
                patrimony_number: patrimonyNumber,
            }
        });

        return res.json(formatResponseOneServerAsset(asset));
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            patrimony_number: Yup.string().required(),
            host: Yup.string().required(),
            id_category: Yup.string().required(),
            port: Yup.string().required(),
            id_branch: Yup.string().required(),
            monitor: Yup.string().required(),
            id_status: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const asset = await ServerAsset.create({
            name: req.body.name,
            patrimony_number: req.body.patrimony_number,
            host: req.body.host,
            id_category: req.body.id_category,
            port: req.body.port,
            id_branch: req.body.id_branch,
            description: req.body.description,
            location: req.body.location,
            monitor: req.body.monitor,
            id_status: req.body.id_status
        });

        const serverMonitoring = await ServerAssetMonitoring.create({
            id_server: asset.id,
            status: 0
        });

        return res.json(asset);
    }
}

export default new serverAssetController();