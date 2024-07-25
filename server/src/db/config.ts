import { Dialect } from "sequelize";

interface DBConfig {
    host: string;
    port: number;
    database: string;
    dialect: Dialect;
    username: string;
    password: string;
}

export const config: DBConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'perntodo_sequelize',
    dialect: 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
}