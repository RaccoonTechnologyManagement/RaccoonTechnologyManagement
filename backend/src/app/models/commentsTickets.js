import Sequelize, { Model } from "sequelize";

class CommentsTickets extends Model {
    static init(sequelize){
        super.init(
            {
                id_person: Sequelize.INTEGER,
                id_ticket: Sequelize.INTEGER,
                comment: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'comments_tickets',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Ticket, {foreignKey: 'id_ticket', as: 'ticket'});
        this.belongsTo(models.Person, {foreignKey: 'id_person', as: 'person'});
    }
}

export default CommentsTickets;