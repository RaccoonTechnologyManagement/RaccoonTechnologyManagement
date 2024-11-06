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
                id_departament: Sequelize.INTEGER,
                ip_address: Sequelize.STRING,
                mac_address: Sequelize.STRING,
                network_mac_address: Sequelize.STRING,
                ipv6: Sequelize.STRING,
                description: Sequelize.STRING,
                id_status: Sequelize.INTEGER

            },
            {
                sequelize,
                tableName: 'server_hardware',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.SubCategoriesHardware, {foreignKey: 'id_subcategory', as: 'category'});
        this.belongsTo(models.StatusAsset, {foreignKey: 'id_status', as: 'status'});
        this.belongsTo(models.Departaments, {foreignKey: 'id_departament', as: 'departaments'});
    }
}

export default HardwareAsset;