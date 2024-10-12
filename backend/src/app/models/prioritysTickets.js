import Sequelize, { Model } from "sequelize";

class PrioritysTickets extends Model {
    static init(sequelize){
        super.init(
            {
                priority: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'prioritys_tickets'
            }
        );
        return this;
    }
}

export default PrioritysTickets;