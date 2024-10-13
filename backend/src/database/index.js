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
import CommentsTickets from '../app/models/commentsTickets';
import PrioritysTickets from '../app/models/prioritysTickets';
import RelPrioritysTickets from '../app/models/relPrioritysTickets';
import StatusTickets from '../app/models/statusTickets';
import RelStatusTickets from '../app/models/relStatusTickets';
import Companys from '../app/models/companys';
import Departaments from '../app/models/departaments';
import Branches from '../app/models/branches';
import RelBranchesDepartaments from '../app/models/relBranchesDepartaments';
import RelCompanysBranches from '../app/models/relCompanysBranches';
import RelPersonsDepartaments from '../app/models/relPersonsDepartaments';
import RelDepartamentsTickets from '../app/models/relDepartamentsTickets';

const models = [
	User,
	Person,
	Ticket,
	CategorysTickets,
	RelCategorysTickets,
	CategorysPersons,
	RelCategorysPersons,
	RelPersonsTickets,
	CommentsTickets,
	PrioritysTickets,
	RelPrioritysTickets,
	StatusTickets,
	RelStatusTickets,
	Companys,
	Departaments,
	Branches,
	RelBranchesDepartaments,
	RelCompanysBranches,
	RelPersonsDepartaments,
	RelDepartamentsTickets
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