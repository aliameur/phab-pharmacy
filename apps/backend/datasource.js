const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'medusa_db',
  entities: ['dist/models/*.js'],
  migrations: ['dist/migrations/*.js'],
});

module.exports = {
  datasource: AppDataSource,
};
