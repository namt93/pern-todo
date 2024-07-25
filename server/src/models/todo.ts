import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    ForeignKey, 
    BelongsTo 
} from "sequelize-typescript";

import { User } from "./user";


@Table({
    tableName: 'todo',
    modelName: 'Todo',
    timestamps: true,
})
export class Todo extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare description: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}

export default Todo;