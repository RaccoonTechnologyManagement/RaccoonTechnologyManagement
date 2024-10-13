import Sequelize, { Model } from "sequelize";

class Companys extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                corporate_name: Sequelize.STRING,
                metier: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'companys',
            }
        );
        return this;
    }
}

export default Companys;