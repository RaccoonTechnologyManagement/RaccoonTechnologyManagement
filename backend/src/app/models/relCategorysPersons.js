import Sequelize, { Model } from "sequelize";

class RelCategorysPersons extends Model {
    static init(sequelize){
        super.init(
            {
                id_category: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_categorys_persons',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Person, {foreignKey: 'id_person', as: 'person'});
        this.belongsTo(models.CategorysPersons, {foreignKey: 'id_category', as: 'category'});
    }
}

export default RelCategorysPersons;