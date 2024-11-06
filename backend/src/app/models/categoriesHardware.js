import Sequelize, { Model } from "sequelize";

class CategoriesHardware extends Model {
    static init(sequelize){
        super.init(
            {
                category: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'categories_hardware'
            }
        );
        return this;
    }
}

export default CategoriesHardware;