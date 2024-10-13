import Sequelize, { Model } from "sequelize";

class Ticket extends Model {
    static init(sequelize){
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                exp_finish_at: Sequelize.DATE,
                finished_at: Sequelize.DATE
            },
            {
                sequelize,
                tableName: 'tickets',
            }
        );
        return this;
    }

    static associate(models) {
        this.hasMany(models.RelCategorysTickets, { foreignKey: 'id_ticket', as: 'category' });
        this.hasMany(models.RelPrioritysTickets, { foreignKey: 'id_ticket', as: 'priority' });
        this.hasMany(models.RelPersonsTickets, { foreignKey: 'id_ticket', as: 'personsTickets' });
        this.hasMany(models.RelDepartamentsTickets, { foreignKey: 'id_ticket', as: 'departaments' });
    }
}

export default Ticket;