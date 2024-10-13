'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('rel_companys_branches', {
			 id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true, 
			 },
			 id_company: {
				type: Sequelize.INTEGER,
				references: { model: 'companys', key: 'id'},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false
			},
			id_branch: {
				type: Sequelize.INTEGER,
				references: { model: 'branches', key: 'id'},
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
		return queryInterface.dropTable('rel_companys_branches');
	}
};
