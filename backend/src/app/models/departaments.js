import Sequelize, { Model } from "sequelize";

class Departaments extends Model {
    static init(sequelize){
        super.init(
            {
                department_name: Sequelize.STRING,
                description: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'departaments',
            }
        );
        return this;
    }
    static associate(models) {
        this.hasMany(models.RelBranchesDepartaments, { foreignKey: 'id_departament', as: 'relDepartament' });
    }
}

export default Departaments;