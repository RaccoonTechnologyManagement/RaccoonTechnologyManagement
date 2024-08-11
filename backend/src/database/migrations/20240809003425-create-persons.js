'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('persons', {
			 id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true, 
			 },
			id_user: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id'},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false
			},
			 name: {
				type: Sequelize.STRING,
				allowNull: false
			 },
			lastname: {
				type: Sequelize.STRING,
				allowNull: false
			},
			telephone: {
				type: Sequelize.STRING,
				allowNull: false
			},
			office: {
				type: Sequelize.STRING,
				allowNull: false
			},
			person_activy: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
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
		return queryInterface.dropTable('persons');
	}
};
