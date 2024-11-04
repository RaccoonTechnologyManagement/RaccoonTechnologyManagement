import Sequelize, { Model } from "sequelize";

class RelPersonsDepartaments extends Model {
    static init(sequelize){
        super.init(
            {
                id_person: Sequelize.INTEGER,
                id_departament: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_persons_departaments',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Person, {foreignKey: 'id_person', as: 'person'});
        this.belongsTo(models.Departaments, {foreignKey: 'id_departament', as: 'departaments'});
    }
}

export default RelPersonsDepartaments;