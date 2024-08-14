import * as Yup from 'yup'; // biblioteca de validação de campos
import User from '../models/user';

// No controller vamos defirnir as regras de negocio para registro no banco

class UserController {
    async store(req, res) {

        const schema = Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string() // Obrigatório ser uma string
            .email() // Obrigatório ser um e-mail
            .required(), // Obrigatório estar a requisição
            password: Yup.string()
            .required()
            .min(6) // Obrigatório ter no minimo 6 caracteres
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }


        // Fazendo verificação se já tem um email na base igual o que está sendo enviado na requisição
        const userExist = await User.findOne({
            where: {username: req.body.username }
        });

        if(userExist){
            return res.status(400).json({ error: 'Usuario já existe '})
        }

        // Fazendo verificação se já tem um email na base igual o que está sendo enviado na requisição
        const emailExist = await User.findOne({
            where: {email: req.body.email }
        });

        if(emailExist){
            return res.status(400).json({ error: 'Email já cadastrado '})
        }

        // Enviando data da requisição para sequelize registrar
        // { id, name, email } o que vou devolver para o frontend
        const { id, username, email } = await User.create(req.body);
        return res.json({
            id,
            username,
            email,
        });
    }

    async update(req, res){

        const schema = Yup.object().shape({
            username: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => oldPassword ? field.required() : field), // caso tenha password na requisiçao, oldPassword também se torna obrigatorio
            confirmPassword: Yup.string().when('password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field), // caso tenha password na requisiçao, confirmPassword precisa ser igual
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        // Resgatando senh atual e email
        const { email, oldPassword } = req.body;

        // Verificando se existe usuario com o ID passado em auth.js:25
        const user = await User.findByPk(req.userId);

        // Verifica se existe email passado na requisição é igual da base
        if (typeof email !== 'undefined')
        {
            if(email !== user.email){
                const userExists = await User.findOne({
                    where: { email },
                });
        
                if(userExists){
                    return res.status(400).json({ error: 'Usuario já existe '})
                }
            }
    
            console.log('A variável está definida');
        }

        // Verifica se tem parametro "oldPassword" nova na requisição
        // Se tiver ele compara com a senha do banco
        // Se tiver "oldPassword" o usuario quer trocar a sua senha
        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Senha antiga incorreta '})
        }

        const {id, username} = await user.update(req.body);

        return res.json({
            id,
            username,
            email
        });
    }
}
export default new UserController();