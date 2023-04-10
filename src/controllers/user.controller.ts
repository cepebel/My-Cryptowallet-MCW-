import { UserService} from "../services/user.service"
const userService: UserService = new UserService()

export const userController = {
    ping: (_req: any, res: any)=>{
        console.log('Se ha hecho ping!')
        const MESSAGE: string = 'Pong'
        res.send(MESSAGE)
    },
    addUser : (req: any, res: any) =>{
        try{
            const newUser = req.body
            userService.addUser(newUser).then(result =>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getAllUsers: (_req: any, res:any) =>{
        userService.getAllUsers()
        .then(result => res.json(result))
        .catch(error => {
            console.error(error)
            res.sendStatus(500)
        })
    },
    getUserById : (req: any, res: any) =>{
        try{
            const userId = req.params.id
            userService.getUserById(userId).then(result =>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getUserByEmail: (req: any, res: any) =>{
        try{
            const userEmail = req.params.email
            userService.getUserByEmail(userEmail).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    logIn: (req: any, res: any) =>{
        try{
            const email = req.params.email
            const password = req.params.password
            userService.logIn(email,password)
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    }

}