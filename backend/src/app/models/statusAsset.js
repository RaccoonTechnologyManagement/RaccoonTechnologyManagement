import Sequelize, { Model } from "sequelize";

class StatusAsset extends Model {
    static init(sequelize){
        super.init(
            {
                status: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'status_asset'
            }
        );
        return this;
    }
    static associate(models) {
        this.hasMany(models.HardwareAsset, { foreignKey: 'id_status', as: 'statusAsset' });
        this.hasMany(models.ServerAsset, { foreignKey: 'id_status', as: 'serverStatusAsset' });

    }
}

export default StatusAsset;