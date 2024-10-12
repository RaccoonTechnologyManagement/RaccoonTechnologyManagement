import Sequelize, { Model } from "sequelize";

class RelStatusTickets extends Model {
    static init(sequelize){
        super.init(
            {
                id_ticket: Sequelize.INTEGER,
                id_status: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_status_tickets',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Ticket, {foreignKey: 'id_ticket', as: 'ticket'});
        this.belongsTo(models.StatusTickets, {foreignKey: 'id_status', as: 'status'});
    }
}

export default RelStatusTickets;