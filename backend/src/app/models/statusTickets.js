import Sequelize, { Model } from "sequelize";

class StatusTickets extends Model {
    static init(sequelize){
        super.init(
            {
                status: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'status_tickets'
            }
        );
        return this;
    }
}

export default StatusTickets;