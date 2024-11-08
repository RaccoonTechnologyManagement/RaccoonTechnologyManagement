import Sequelize, { Model } from "sequelize";

class HardwareAsset extends Model {
    static init(sequelize){
        super.init(
            {
                patrimony_number: Sequelize.STRING,
                model: Sequelize.STRING,
                brand: Sequelize.STRING,
                serial_number: Sequelize.STRING,
                id_subcategory: Sequelize.INTEGER,
                id_branch: Sequelize.INTEGER,
                ip_address: Sequelize.STRING,
                mac_address: Sequelize.STRING,
                network_mac_address: Sequelize.STRING,
                location: Sequelize.STRING,
                ipv6: Sequelize.STRING,
                ipv4: Sequelize.STRING,
                description: Sequelize.STRING,
                id_person: Sequelize.INTEGER,
                id_status: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'hardware_asset',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.SubCategoriesHardware, {foreignKey: 'id_subcategory', as: 'subcategoryHardware'});
        this.belongsTo(models.StatusAsset, {foreignKey: 'id_status', as: 'statusAsset'});
        this.belongsTo(models.Branches, {foreignKey: 'id_branch', as: 'branch'});
        this.belongsTo(models.Person, {foreignKey: 'id_person', as: 'person'});
    }
}

export default HardwareAsset;