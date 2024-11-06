'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('server_hardware', {
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
        model: {
          type: Sequelize.STRING,
          allowNull: false
        },
        brand: {
          type: Sequelize.STRING,
          allowNull: false
        },
        serial_number: {
          type: Sequelize.STRING,
          allowNull: false
        },
        id_subcategory: {
          type: Sequelize.INTEGER,
          references: { model: 'subcategories_hardware', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false
        },
        id_departament: {
          type: Sequelize.INTEGER,
          references: { model: 'departaments', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false
        },
        ip_address: {
          type: Sequelize.STRING,
          allowNull: true
        },
        mac_address: {
          type: Sequelize.STRING,
          allowNull: true
        },
        network_mac_address: {
          type: Sequelize.STRING,
          allowNull: true
        },
        ipv6: {
          type: Sequelize.STRING,
          allowNull: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
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
		return queryInterface.dropTable('server_hardware');
	}
};