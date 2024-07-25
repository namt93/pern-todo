import { Sequelize } from "sequelize-typescript";

import { config } from "./config";
import { modelsArray } from "../models";


const sequelize = new Sequelize({
    database: config.database,
    dialect: config.dialect,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    models: modelsArray,
})


export const checkDBConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
        
    }
}

checkDBConnection();

export { sequelize };