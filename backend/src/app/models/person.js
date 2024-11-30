import Sequelize, { Model } from "sequelize";

class Person extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                lastname: Sequelize.STRING,
                telephone: Sequelize.STRING,
                office: Sequelize.STRING,
                profile_photo: Sequelize.STRING,
                person_activy: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                tableName: 'persons',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user'});
        this.hasMany(models.RelCategorysPersons, { foreignKey: 'id_person', as: 'category' });
        this.hasMany(models.RelPersonsDepartaments, { foreignKey: 'id_person', as: 'departaments' });
        this.hasMany(models.HardwareAsset, { foreignKey: 'id_person', as: 'personAssetHardware' });
    }
}

export default Person;