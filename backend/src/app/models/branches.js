import Sequelize, { Model } from "sequelize";

class Branches extends Model {
    static init(sequelize){
        super.init(
            {
                branch_name: Sequelize.STRING,
                description: Sequelize.STRING,
                website: Sequelize.STRING,
                country: Sequelize.STRING,
                city: Sequelize.STRING,
                state: Sequelize.STRING,
                neighborhood: Sequelize.STRING,
                address: Sequelize.STRING,
                postal_code: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'branches',
            }
        );
        return this;
    }
    static associate(models) {
        this.hasMany(models.RelCompanysBranches, { foreignKey: 'id_branch', as: 'relBranch' });
        this.hasMany(models.HardwareAsset, { foreignKey: 'id_branch', as: 'branch' });
    }
}

export default Branches;