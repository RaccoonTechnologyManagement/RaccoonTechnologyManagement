import Sequelize, { Model } from "sequelize";

class RelPersonsTickets extends Model {
    static init(sequelize){
        super.init(
            {
                id_ticket: Sequelize.INTEGER,
                id_person_creator: Sequelize.INTEGER,
                id_person_accountable: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_persons_tickets',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Ticket, {foreignKey: 'id_ticket', as: 'ticket'});
        this.belongsTo(models.Person, {foreignKey: 'id_person_creator', as: 'creator'});
        this.belongsTo(models.Person, {foreignKey: 'id_person_accountable', as: 'accountable'});
    }
}

export default RelPersonsTickets;