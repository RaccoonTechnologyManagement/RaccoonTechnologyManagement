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
                id_branch: Sequelize.INTEGER,
                location: Sequelize.STRING,
                description: Sequelize.STRING,
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
        this.belongsTo(models.CategoriesServer, {foreignKey: 'id_category', as: 'categoryServer'});
        this.belongsTo(models.StatusAsset, {foreignKey: 'id_status', as: 'serverStatusAsset'});
        this.belongsTo(models.Branches, {foreignKey: 'id_branch', as: 'serverBranch'});
    }
}

export default ServerAsset;