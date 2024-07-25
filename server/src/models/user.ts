import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    HasMany, 
    HasOne 
} from "sequelize-typescript";

import { Todo } from './todo';
import { Authentication } from "./authentication";

@Table({
    tableName: 'user',
    modelName: 'User',
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @HasMany(() => Todo)
    declare todos: Todo[];

    @HasOne(() => Authentication)
    declare authentication: Authentication;
}

export default User;