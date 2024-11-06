import StatusAsset from '../models/statusAsset';
import * as Yup from 'yup'; // biblioteca de validação de campos

class statusAssetController {

    async index(req, res) {
        const status = await StatusAsset.findAll();
        return res.json(status);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            status: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Campos preenchidos de forma incorreta'})
        }

        const status = await StatusAsset.create({
            status: req.body.status
        });

        return res.json(status);
    }
}

export default new statusAssetController();