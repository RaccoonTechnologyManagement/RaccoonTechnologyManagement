import Sequelize, { Model } from "sequelize";

class ServerAsset extends Model {
    static init(sequelize){
        super.init(
            {
                patrimony_number: Sequelize.STRING,
                name: Sequelize.STRING,
                host: Sequelize.STRING,
                id_category: Sequelize.INTEGER,
                port: Sequelize.STRING,
                id_departament: Sequelize.INTEGER,
                location: Sequelize.STRING,
                monitor: Sequelize.BOOLEAN,
                id_status: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'server_asset',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.CategoriesServer, {foreignKey: 'id_category', as: 'category'});
        this.belongsTo(models.StatusAsset, {foreignKey: 'id_status', as: 'status'});
        this.belongsTo(models.Departaments, {foreignKey: 'id_departament', as: 'departaments'});
    }
}

export default ServerAsset;