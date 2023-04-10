import {NUMBER, STRING} from 'sequelize'
import {Table, Column, Model} from 'sequelize-typescript'

@Table({
    freezeTableName: true,
    schema: 'mycryptowallet',
    tableName: 'users',
    createdAt: false,
    updatedAt: false
})

export class UserPojo extends Model{
    @Column({
        type: STRING,
        primaryKey: true,
        field: 'userId'
    })
    userId!: string
    @Column({
        type: STRING,
        field: 'username'
    })
    username!: string
    @Column({
        type: STRING,
        field: 'name'
    })
    name: string
    @Column({
        type: STRING,
        field: 'surname'
    })
    surname: string
    @Column({
        type: STRING,
        field: 'password'
    })
    password!: string
    @Column({
        type: STRING,
        field: 'email'
    })
    email!: string
    @Column({
        type: NUMBER,
        field: 'budget'
    })
    budget: number
    @Column({
        type: STRING,
        field: 'payment'
    })
    payment: string

}