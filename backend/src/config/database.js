module.exports = {	// configurar conexão com banco de dados
	dialect: 'postgres',
	host: 'postgresql.uhserver.com',
	username: 'raccoon',
	password: 'nZj-3yzU',
	database: 'raccoontech',
	define: {
		timestamps: true,        // sempre criar colunas created_at e deleted_at a cada registro
		underscored: true,       // nomeclatura de colunas com relacionamentos ex: user_id
		underscoredAll: true
	}
}