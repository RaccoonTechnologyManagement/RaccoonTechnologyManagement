import Sequelize, { Model } from "sequelize";

class CategorysTickets extends Model {
    static init(sequelize){
        super.init(
            {
                category: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'categorys_tickets'
            }
        );
        return this;
    }
}

export default CategorysTickets;