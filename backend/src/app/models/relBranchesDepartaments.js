import Sequelize, { Model } from "sequelize";

class RelBranchesDepartaments extends Model {
    static init(sequelize){
        super.init(
            {
                id_branch: Sequelize.INTEGER,
                id_departament: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_branches_departaments',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Branches, {foreignKey: 'id_branch', as: 'branch'});
        this.belongsTo(models.Departaments, {foreignKey: 'id_departament', as: 'departament'});
    }
}

export default RelBranchesDepartaments;