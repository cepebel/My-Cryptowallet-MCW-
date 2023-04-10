import { CoinService } from "../services/coin.service";
const coinService: CoinService = new CoinService()

export const coinController = {
    addCoin: (req: any, res: any) =>{
        try{
            const newCoin = req.body
            coinService.addCoin(newCoin).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getAllCoins: (_req: any, res: any) =>{
        coinService.getAllCoins()
        .then(result => res.json(result))
        .catch(error => {
            console.error(error)
            res.sendStatus(500)
        })
    },
    getCoinById: (req: any, res:any) =>{
        try{
            const id = req.params.id
            coinService.getCoinById(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getJoinById: (req: any, res:any) =>{
        try{
            const id = req.params.id
            coinService.getJoinById(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getAllJoins:(_req: any, res: any) =>{
        coinService.getAllJoins()
        .then(result=> res.json(result))
        .catch(error =>{
            console.error(error)
            res.sendStatus(500)
        })
    },
    getUserJoins:(req:any, res:any)=>{
        try{
            const id = req.params.userId
            coinService.getUserJoins(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    updateJoin:(req:any, res:any)=>{
        try{
            const {userId, coinId,  amount}  = req.body
            coinService.updateJoin(userId, coinId, amount).then(result=>{
                res = result
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    checkAmount: (req: any, res: any)=>{
        try{
            const coinId = req.params.id
            coinService.checkAmount(coinId).then(result=>{
                res = result
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    updateAmount: (req: any, res: any)=>{
        try{
            const {coinId, amount} = req.body
            coinService.updateAmount(coinId, amount).then(result=>{
                res=result
                
            })
        }catch(error){ 
            console.error(error)
            res.sendStatus(500)
        }
        
    },
}