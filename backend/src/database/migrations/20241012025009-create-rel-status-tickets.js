'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('rel_status_tickets', {
			 id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true, 
			 },
			 id_ticket: {
				type: Sequelize.INTEGER,
				references: { model: 'tickets', key: 'id'},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false
			},
			id_status: {
				type: Sequelize.INTEGER,
				references: { model: 'status_tickets', key: 'id'},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false
			},
			 created_at: {
				type: Sequelize.DATE,
				allowNull: false
			 },
			 updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			 },
			});
	},

	 down (queryInterface) {
		return queryInterface.dropTable('rel_status_tickets');
	}
};
