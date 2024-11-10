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
    static associate(models){
        this.hasMany(models.ServerAsset, { foreignKey: 'id_category', as: 'categoryServer' });
    }
}

export default CategoriesServer;