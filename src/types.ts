export class UserDto{
    userId: string
    username: string
    name: string
    surname: string
    email: string
    password: string
    budget: number
    payment: string
}

export class CoinDto{
    coinId: string
    name: string
    symbol: string
    value: number
    amount: number
}

export class JoinDto{
    userId: string
    coinId: string
    amount: number
    joinId: string

    constructor(newUserId: string, newCoinId: string, amount: number){
        this.joinId = newUserId+newCoinId
        this.coinId = newCoinId
        this.userId = newUserId
        this.amount = amount
    }
}