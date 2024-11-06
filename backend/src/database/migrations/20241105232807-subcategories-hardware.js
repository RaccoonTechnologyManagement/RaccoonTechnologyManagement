'use strict';

// Esse seeders que ira criar a tabela no nosso banco
// Onde definimos também as colunas e suas constraints

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	 up (queryInterface, Sequelize) {
		return queryInterface.createTable('subcategories_hardware', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true, 
        },
        subcategory: {
          type: Sequelize.STRING,
          allowNull: false
        },
        id_category: {
          type: Sequelize.INTEGER,
          references: { model: 'categories_hardware', key: 'id'},
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
		return queryInterface.dropTable('subcategories_hardware');
	}
};