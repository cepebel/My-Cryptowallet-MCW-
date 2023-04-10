import { Sequelize } from "sequelize-typescript";
import { CoinPojo } from "../models/coin.model";
import { JoinPojo } from "../models/join.model";


export const connect = () =>{
    const DB_HOSTNAME = 'localhost'
    const DB_PORT = 5432
    const DB_NAME = 'postgres'
    const DB_USERNAME = 'postgres'
    const DB_PASSWORD = 'd3cj'
    const DB_SCHEMA  = 'mycryptowallet'
    const DB_DIALECT: any = 'postgres' // En realidad es un db dialect y no un string

    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_HOSTNAME, 
        dialect: DB_DIALECT, 
        port: DB_PORT, 
        schema: DB_SCHEMA,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    })

    sequelize.addModels([CoinPojo])
    sequelize.addModels([JoinPojo])
    const db : any = {}
    db.Sequelize = Sequelize // Conexion con la librería de sequelize.
    db.sequelize = sequelize // Conexión con los parámetros de conexión.

    return db
}