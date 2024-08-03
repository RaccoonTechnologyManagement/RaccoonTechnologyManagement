import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    // Resgata o token no header da requisição
    const authHeader = req.headers.authorization;

    // Verifica se token existe
    if(!authHeader){
        return res.status(401).json({error: "token não existe"});
    }

     // Usar split para retirar espaço de "bearer 123564612368" => "bearer123564612368"
     // [, token] => pega somente o segundo elemento, no caso "123564612368"
    const [, token] = authHeader.split(' ');

    // Usando verify para decodificar berear token 
    // Usando promisify que é nativo do node
    // Se Try usa a função next para continuar. Ex: Ir para outra pagina.
    try{
        const decoded = await promisify(jwt.verify)( token, authConfig.secret);

        // envia token na requisição da rota
        req.userId = decoded.id;
        return next();

    }catch(err){
        return res.status(401).json({error: "token inválido"});
    }
}