import Sequelize, { Model } from "sequelize";

class RelCategorysTickets extends Model {
    static init(sequelize){
        super.init(
            {
                id_category: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'rel_categorys_tickets',
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Ticket, {foreignKey: 'id_ticket', as: 'ticket'});
        this.belongsTo(models.CategorysTickets, {foreignKey: 'id_category', as: 'category'});
    }
}

export default RelCategorysTickets;