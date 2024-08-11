import jwt from 'jsonwebtoken'; // biblioteca de auenticação
import User from '../models/user';

import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password }= req.body;

        // Verificando se email fornecido na requisição existe na base
        const user = await User.findOne({ where: {email}});
        if(!user){
            return res.status(401).json({ error: 'Usuario não existe' });
        }

        // chamando função (checkPassword) criada no model users para compara se senha correta
        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const { id, name } = user;
        return res.json({
            user: {
                id,
                name,
                email,
            },
            // sign => função nativa de jwt para criar token com base nos parametros
            // 1° parametro => id do usuario para ser incorporado no token
            // 2° parametro => hash criado no site MD5 onlline de acordo com uma palavra de segurança
            // 3° parametro => Objeto de configurações do token
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

export default new SessionController();