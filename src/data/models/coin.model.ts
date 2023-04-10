import {NUMBER, STRING} from 'sequelize'
import {Table, Column, Model} from 'sequelize-typescript'

@Table({
    freezeTableName: true,
    schema: 'mycryptowallet',
    tableName: 'coins',
    createdAt: false,
    updatedAt: false
})

export class CoinPojo extends Model{
    @Column({
        type:STRING,
        primaryKey: true,
        field: 'coinId'
    })
    coinId!: string
    @Column({
        type: STRING,
        field: 'name'
    })
    name: string
    @Column({
        type: STRING,
        field: 'symbol'
    })
    symbol: string
    @Column({
        type: NUMBER,
        field: 'value'
    })
    value: number
    @Column({
        type: NUMBER,
        field: 'amount'
    })
    amount: number

}