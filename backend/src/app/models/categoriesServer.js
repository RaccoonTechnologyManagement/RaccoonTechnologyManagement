import Sequelize, { Model } from "sequelize";

class CategoriesServer extends Model {
    static init(sequelize){
        super.init(
            {
                category: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'categories_server'
            }
        );
        return this;
    }
}

export default CategoriesServer;