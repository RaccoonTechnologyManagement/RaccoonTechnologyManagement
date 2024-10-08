import Sequelize, { Model } from "sequelize";

class CategorysPersons extends Model {
    static init(sequelize){
        super.init(
            {
                category: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'categorys_persons'
            }
        );
        return this;
    }
}

export default CategorysPersons;