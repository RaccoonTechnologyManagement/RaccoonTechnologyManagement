import Sequelize, { Model } from "sequelize";

class SubCategoriesHardware extends Model {
    static init(sequelize){
        super.init(
            {
                id_category: Sequelize.INTEGER,
                subcategory: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'subcategories_hardware',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.CategoriesHardware, {foreignKey: 'id_category', as: 'category'});
    }
}

export default SubCategoriesHardware;