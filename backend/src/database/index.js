import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Importando nossos models
import User from '../app/models/user';
import Person from '../app/models/person';
import Ticket from '../app/models/ticket';
import CategorysTickets from '../app/models/categorysTickets';
import RelCategorysTickets from '../app/models/relCategorysTickets';
import CategorysPersons from '../app/models/categorysPersons';
import RelCategorysPersons from '../app/models/relCategorysPersons';
import RelPersonsTickets from '../app/models/relPersonsTickets';

const models = [
	User,
	Person,
	Ticket,
	CategorysTickets,
	RelCategorysTickets,
	CategorysPersons,
	RelCategorysPersons,
	RelPersonsTickets
]

// Carregando nossos Models
// Concetando o banco de dados com os nossos Models 

class Database {
	constructor() {
		this.init();
	}
	init() {
		this.connection = new Sequelize(databaseConfig);

		// Acessando cada models do array e acessando init e carregando o model
		models
		.map(model => model.init(this.connection))
		.map(model => model.associate && model.associate(this.connection.models));
	}
}

export default new Database()