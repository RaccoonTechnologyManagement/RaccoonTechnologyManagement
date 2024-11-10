'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('server_asset', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true, 
        },
        patrimony_number: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        host: {
          type: Sequelize.STRING,
          allowNull: false
        },
        id_category: {
          type: Sequelize.INTEGER,
          references: { model: 'categories_server', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false
        },
        port: {
          type: Sequelize.STRING,
          allowNull: false
        },
        id_branch: {
          type: Sequelize.INTEGER,
          references: { model: 'branches', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false
        },
        location: {
          type: Sequelize.STRING,
          allowNull: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        monitor: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        id_status: {
          type: Sequelize.INTEGER,
          references: { model: 'status_asset', key: 'id'},
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
		return queryInterface.dropTable('server_asset');
	}
};