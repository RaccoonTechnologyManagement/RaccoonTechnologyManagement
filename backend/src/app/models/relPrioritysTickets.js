import Sequelize, { Model } from "sequelize";

class RelPrioritysTickets extends Model {
    static init(sequelize){
        super.init(
            {
                id_ticket: Sequelize.INTEGER,
                id_priority: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_prioritys_tickets',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Ticket, {foreignKey: 'id_ticket', as: 'ticket'});
        this.belongsTo(models.PrioritysTickets, {foreignKey: 'id_priority', as: 'priority'});
    }
}

export default RelPrioritysTickets;