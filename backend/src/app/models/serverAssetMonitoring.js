import Sequelize, { Model } from "sequelize";

class ServerAssetMonitoring extends Model {
    static init(sequelize){
        super.init(
            {
                id_server: Sequelize.INTEGER,
                status: Sequelize.INTEGER,
                alert: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'server_asset_monitoring',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.ServerAsset, {foreignKey: 'id_server', as: 'serverAsset'});
    }
}

export default ServerAssetMonitoring;