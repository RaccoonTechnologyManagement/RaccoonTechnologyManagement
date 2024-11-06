import HardwareAsset from '../models/hardwareAsset';
import * as Yup from 'yup'; // biblioteca de validação de campos

class hardwareAssetController {

    async index(req, res) {
        const asset = await HardwareAsset.findAll();
        return res.json(asset);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            patrimony_number: Yup.string().required(),
            model: Yup.string().required(),
            brand: Yup.string().required(),
            serial_number: Yup.string().required(),
            id_subcategory: Yup.string().required(),
            id_departament: Yup.string().required(),
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
            id_departament: req.body.id_departament,
            ip_address: req.body.ip_address,
            mac_address: req.body.mac_address,
            network_mac_address: req.body.network_mac_address,
            ipv6: req.body.ipv6,
            description: req.body.description,
            id_status: req.body.id_status
        });

        return res.json(asset);
    }
}

export default new hardwareAssetController();