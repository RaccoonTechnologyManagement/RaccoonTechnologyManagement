import Sequelize, { Model } from "sequelize";

class RelCompanysBranches extends Model {
    static init(sequelize){
        super.init(
            {
                id_company: Sequelize.INTEGER,
                id_branch: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_companys_branches',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Companys, {foreignKey: 'id_company', as: 'company'});
        this.belongsTo(models.Branches, {foreignKey: 'id_branch', as: 'branch'});
    }
}

export default RelCompanysBranches;