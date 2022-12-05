import { Sequelize } from "sequelize-typescript";
import 'dotenv/config'
import { Car } from "src/entities/car.entity";
import { Category } from "src/entities/category.entity";
import { User } from "src/entities/user.entity";

export const sequelize = new Sequelize({
    dialect: process.env.DATABASE_TYPE as 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    repositoryMode: true,
    logging: true,
    models: [Car, Category,User],
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
