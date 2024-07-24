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
    tableName: 'authentication',
    modelName: 'Authentication',
    timestamps: true,
})
export class Authentication extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
    })
    declare salt: string;

    @Column({
        type: DataType.STRING,
    })
    declare sessionToken: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}

export default Authentication;