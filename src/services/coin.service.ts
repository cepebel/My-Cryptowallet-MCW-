import { CoinRepository } from "../data/repositories/coin.repository";
import { CoinPojo } from "../data/models/coin.model";
import { CoinDto} from "../types";
import { JoinPojo  } from '../data/models/join.model';
import { JoinDto } from "../types";

export class CoinService{
    _coinRepository: CoinRepository

    constructor(){
        this._coinRepository = new CoinRepository()
    }

    async addCoin(coin: CoinDto): Promise<string>{
        const dbcourse: CoinPojo = coin as CoinPojo
        const coursePromise = await this._coinRepository.addCoin(dbcourse).then(coinId=>{
            return coinId
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return coursePromise
    }

    async getAllCoins(): Promise<CoinDto[]>{
        const coursesPromise = await this._coinRepository.getAllCoins().then(coins=>{
            return coins
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return coursesPromise
    }

    async getCoinById(id:string): Promise<CoinDto | undefined>{
        const coursePromise = await this._coinRepository.getCoinById(id).then(coin=>{
            return coin
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return coursePromise
    }

    async getJoinById(id: string): Promise<JoinDto | undefined>{
        const joinPromise = await this._coinRepository.getJoinById(id).then(join=>{
            return join
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return joinPromise
    }

    async getUserJoins(id:string): Promise<JoinDto[]>{
        const joinsPromise = await this._coinRepository.getUserJoins(id).then(joins=>{
            return joins
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return joinsPromise
    }

    async getUserCoins(id:string): Promise<CoinDto[]| undefined>{
        let userJoins = await this.getUserJoins(id)
        if(userJoins.length>0){
            let coursesIdArray = []
            for(let i=0; i<userJoins.length; i++){
                coursesIdArray.push(userJoins[i].coinId)
            }
            const coinPromise = await this._coinRepository.getCoinsById(coursesIdArray)
            return coinPromise
        }
        else{
            return undefined
        }
    }
    
    async getAllJoins(): Promise<JoinDto[]>{
        const allJoinsPromise = await this._coinRepository.getAllJoins().then(joins=>{
            return joins
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return allJoinsPromise
    }

    async checkAmount(coinId: string): Promise<number>{
        const vacanciesPromise = await this._coinRepository.checkAmount(coinId).then(vacancies=>{
            return vacancies
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return vacanciesPromise
    }

    async updateAmount(coinId: string, newVacancies: number): Promise<boolean>{
        const updatePromise = await this._coinRepository.updateAmount(coinId, newVacancies).then(result=>{
            return result
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return updatePromise
    }

    async updateJoin(userId: string, coinId: string, amount: number): Promise<string | undefined>{
        let joinByIdResult = await this.getJoinById(userId+coinId)
        let selectedCoin = await this.getCoinById(coinId)
        if(selectedCoin!=undefined){
            if(amount<selectedCoin.amount){
                if(joinByIdResult!=undefined){
                    let newAmount = joinByIdResult.amount+amount
                    if(newAmount>=0){
                        console.log('estoy aquí! hola')
                        this._coinRepository.updateJoinAmount(userId+coinId, amount)
                        return 'updated'
                    }
                    else{
                        return 'negative'
                    }   
                }
                else{
                    let newJoin: JoinDto = new JoinDto(userId, coinId, amount)
                    const dbjoin: JoinPojo = newJoin as JoinPojo
                    await this._coinRepository.addJoin(dbjoin)
                    return 'created'
                }
            }
            else{
                return 'impossible'
            }
        }
        else{
            return undefined
        }
       

    }

}