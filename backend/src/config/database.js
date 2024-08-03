module.exports = {	// configurar conexão com banco de dados
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'admin',
	database: 'raccoonTechnology',
	define: {
		timestamps: true,        // sempre criar colunas created_at e deleted_at a cada registro
		underscored: true,       // nomeclatura de colunas com relacionamentos ex: user_id
		underscoredAll: true
	}
}