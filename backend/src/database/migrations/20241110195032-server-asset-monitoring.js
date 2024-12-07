'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('server_asset_monitoring', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true, 
        },
        id_server: {
          type: Sequelize.INTEGER,
          references: { model: 'server_asset', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        alert: {
          type: Sequelize.STRING,
          allowNull: true
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
		return queryInterface.dropTable('server_asset_monitoring');
	}
};