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
        console.log('Me traigo todas las joins del usuario')
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
        console.log(id)
        if(userJoins.length>0){
            let coursesIdArray = []
            for(let i=0; i<userJoins.length; i++){
                console.log('id de la modeda del usuario:'+userJoins[i].coinId)
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
        let selectedCoin = await this.getCoinById(coinId).then(coin=>{
            console.log('Compro moneda'+coin?.name)
            return coin
        })
        let joinByIdResult = await this.getJoinById(userId+coinId)
        if(selectedCoin!=undefined){
            if(amount<selectedCoin.amount){
                console.log('Selected coin amount:'+selectedCoin.amount)
                if(joinByIdResult!=undefined){
                    let newAmount = joinByIdResult.amount*(1.0)+amount*(1.0)
                    console.log('Join amount:'+joinByIdResult.amount*(1.0)+'amount'+amount*(1.0))
                    console.log(newAmount)
                    if(newAmount>0){
                        console.log('estoy aquí! hola')  
                        this._coinRepository.updateJoinAmount(userId+coinId, newAmount)
                        this._coinRepository.updateAmount(coinId, selectedCoin.amount*(1.0)-amount*(1.0))
                        return 'updated'
                    }
                    else if(newAmount == 0){
                        console.log('Lo vendo todo')
                        this._coinRepository.deleteJoin(userId+coinId)
                        this._coinRepository.updateAmount(coinId, selectedCoin.amount*(1.0)-amount*(1.0))
                        return 'allsell'
                    }
                    else{
                        return 'negative'
                    }   
                }  
                else{
                    let newJoin: JoinDto = new JoinDto(userId, coinId, amount)
                    const dbjoin: JoinPojo = newJoin as JoinPojo
                    await this._coinRepository.addJoin(dbjoin)
                    await this._coinRepository.updateAmount(coinId, selectedCoin.amount-amount)
                    return 'created'
                }
            }
            else{
                console.log(selectedCoin.amount+'only avaliable, not possible')
                return 'impossible'
            }
        }
        else{
            return undefined
        }
       

    }

}