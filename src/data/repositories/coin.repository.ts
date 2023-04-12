
import { connect } from './../config/coin.db.config';
import { CoinPojo } from '../models/coin.model';
import { JoinPojo } from '../models/join.model';
import { v4 as uuid } from 'uuid'


export class CoinRepository{
    _db : any = {}
    _coinRepository : any
    _joinRepository : any

    constructor(){
        this._db = connect()
        this._coinRepository = this._db.sequelize.getRepository(CoinPojo)
        this._joinRepository = this._db.sequelize.getRepository(JoinPojo)
    }

    async addCoin(newCoin: CoinPojo): Promise<string>{
        try{
            console.log('Añadiendo curso')
            newCoin.coinId = uuid()
            newCoin = await this._coinRepository.create(newCoin)
            return newCoin.id
        }catch(error){
            console.error(error)
            return '000BASIC'
        }
    }

    async getAllCoins(): Promise<CoinPojo[]>{
        try{
            return await this._coinRepository.findAll()
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getCoinsById(idArray: string[]): Promise<CoinPojo[]>{
        try{
            return await this._coinRepository.findAll({where:{coinId:idArray}})
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getCoinById(id: string): Promise<CoinPojo | undefined>{
        try{
            return await this._coinRepository.findByPk(id)
        } catch (error){
            console.error(error)
            return undefined
        }
    }

    async getJoinById(id: string): Promise<JoinPojo | undefined>{
        try{
            return await this._joinRepository.findByPk(id)
        } catch(error){
            console.error(error)
            return undefined
        }
    }

    async getAllJoins(): Promise<JoinPojo[]>{
        try{
            return await this._joinRepository.findAll()
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getUserJoins(id: string): Promise<JoinPojo[]>{
        try{
            return await this._joinRepository.findAll({where:{userId:id}})
        }catch(error){
            console.error(error)
            return []
        }
    }

    async addJoin(newJoin: JoinPojo): Promise<string>{
        try{
            console.log('creating join')
            newJoin = await this._joinRepository.create(newJoin)
            return newJoin.id
        }catch(error){
            console.error(error)
            return 'failed-to-buy'
        }
    }

    async updateJoinAmount(joinId: string, newAmount: number): Promise<boolean>{
        try{
            await this._joinRepository.update({amount: newAmount}, {where:{joinId:joinId}})
            return true
        }catch(error){
            console.error(error)
            return false
        }
    }

    async deleteJoin(joinId: string): Promise<string>{
        try{
            console.log('Repository deleting: '+joinId)
            this._joinRepository.destroy({where: {joinId: joinId}})
            //await joinToDelete.destroy()
            return 'Successfully-withdrawn'
        }catch(error){
            console.error(error)
            return 'fail-to-withdraw-course-'
        }

    }

    async checkAmount(coinId: string): Promise<number>{
        try{
            const coin = await this._coinRepository.findByPk(coinId)
            return coin.amount
        }catch(error){
            console.error(error)
            return -1
        }
    }

    async updateAmount(coinId: string, newAmount: number): Promise<boolean>{ 
        try{
            console.log('new Amount:'+newAmount)
            const coin = await this._coinRepository.findByPk(coinId)
            await coin.set({amount:newAmount})
            await coin.save()
            return true
        }catch(error){
            console.error(error)
            return false
        }
    }
}