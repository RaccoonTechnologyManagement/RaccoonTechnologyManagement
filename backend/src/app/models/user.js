import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcrypt'; // biblioteca de encriptação de decriptação de senhas/valores

class User extends Model{
    static init(sequelize){
        super.init(
            {
                // Definimos os campos que o usuario irá fornecer, campos que não são gerados pelo sequelize
                username: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL, // Um campo que não tem na tabela, usasdo para manipular dados (Campo Virtual)
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        // 'beforeSave => Antes de salvar ele aplica essa função anonima
        this.addHook('beforeSave', async (user) => {
            // se na requisição possuir senha, a verificação é satisfeita
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8); // o parametro 8 e a força da encriptação
            }
        });

        return this;
    }

    // criando função para verificar se senha da requisição confere com senha do banco
    // compare é uma função nativa de bcrypt, recebe a senha encriptada e da requisição e retorna true ou false
    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User;