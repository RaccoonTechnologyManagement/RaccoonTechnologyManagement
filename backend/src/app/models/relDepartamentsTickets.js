import Sequelize, { Model } from "sequelize";

class RelDepartamentsTickets extends Model {
    static init(sequelize){
        super.init(
            {
                id_ticket: Sequelize.INTEGER,
                id_departament: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_departaments_tickets',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Ticket, {foreignKey: 'id_ticket', as: 'ticket'});
        this.belongsTo(models.Departaments, {foreignKey: 'id_departament', as: 'departament'});
    }
}

export default RelDepartamentsTickets;