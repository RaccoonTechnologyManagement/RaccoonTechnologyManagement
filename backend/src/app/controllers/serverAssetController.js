import ServerAsset from '../models/serverAsset';
import * as Yup from 'yup'; // biblioteca de validação de campos

class serverAssetController {

    async index(req, res) {
        const servers = await ServerAsset.findAll();
        return res.json(servers);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            patrimony_number: Yup.string().required(),
            host: Yup.string().required(),
            id_category: Yup.string().required(),
            port: Yup.string().required(),
            id_departament: Yup.string().required(),
            location: Yup.string().required(),
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
            id_departament: req.body.id_departament,
            location: req.body.location,
            monitor: req.body.monitor,
            id_status: req.body.id_status
        });

        return res.json(asset);
    }
}

export default new serverAssetController();