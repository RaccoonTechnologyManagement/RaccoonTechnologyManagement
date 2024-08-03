'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('users', {
			 id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true, 
			 },
			 username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			 },
			 email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			 },
			 password_hash: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('users');
	}
};
