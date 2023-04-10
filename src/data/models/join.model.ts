import {NUMBER, STRING} from 'sequelize'
import {Table, Column, Model} from 'sequelize-typescript'


@Table({
    freezeTableName: true,
    schema: 'mycryptowallet',
    tableName: 'join'
})

export class JoinPojo extends Model{
    @Column({
        type: STRING,
        primaryKey: true,
        field: 'joinId'
    })
    joinId!: string
    @Column({
        type: STRING,
        field: 'userId'
    })
    userId: string
    @Column({
        type: STRING,
        field: 'coinId'
    })
    coinId: string
    @Column({
        type: NUMBER,
        field: 'amount'
    })
    amount: number

}