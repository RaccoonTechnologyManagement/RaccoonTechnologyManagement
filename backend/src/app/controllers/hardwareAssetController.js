import HardwareAsset from '../models/hardwareAsset';
import Branches from '../models/branches';
import RelCompanysBranches from '../models/relCompanysBranches';
import Companys from '../models/companys';
import StatusTickets from '../models/statusAsset';
import SubCategoriesHardware from '../models/subcategoriesHardware';
import * as Yup from 'yup'; // biblioteca de validação de campos

import { formatResponseHardwareAsset } from '../../functions/functions';
class hardwareAssetController {

    async index(req, res) {

        const include = {
            include: [
                {
                    model: StatusTickets,
                    as: 'statusAsset',
                    attributes: ['status'],
                },
                {
                    model: SubCategoriesHardware,
                    as: 'subcategoryHardware',
                    attributes: ['subcategory'],
                },
                {
                    model: Branches,
                    as: 'branch',
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

        const asset = await HardwareAsset.findAll({
            ...include
        });

        return res.json(formatResponseHardwareAsset(asset));
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            patrimony_number: Yup.string().required(),
            model: Yup.string().required(),
            brand: Yup.string().required(),
            id_subcategory: Yup.string().required(),
            id_branch: Yup.string().required(),
            id_status: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const asset = await HardwareAsset.create({
            model: req.body.model,
            patrimony_number: req.body.patrimony_number,
            brand: req.body.brand,
            serial_number: req.body.serial_number,
            id_subcategory: req.body.id_subcategory,
            id_branch: req.body.id_branch,
            ip_address: req.body.ip_address,
            mac_address: req.body.mac_address,
            network_mac_address: req.body.network_mac_address,
            location: req.body.location,
            ipv6: req.body.ipv6,
            ipv4: req.body.ipv4,
            description: req.body.description,
            id_person: req.body.id_person ?? null,
            id_status: req.body.id_status
        });


        return res.json(asset);
    }
}

export default new hardwareAssetController();