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
}

export default Ticket;