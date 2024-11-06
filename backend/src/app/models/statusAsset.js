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
}

export default StatusAsset;