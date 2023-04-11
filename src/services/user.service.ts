
import { UserRepository } from "../data/repositories/user.repository";
import { UserPojo as UserDto } from "../data/models/user.model";

export class UserService{
    _userRepository: UserRepository

    constructor(){
        this._userRepository = new UserRepository()
    }

    async addUser(user: UserDto) : Promise<string>{
        console.log(user)
        const userPromise = await this._userRepository.addUser(user).then(userId=>{
            return userId
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return userPromise
    }

    async getAllUsers(): Promise<UserDto[]>{
        const usersPromise = await this._userRepository.getAllUsers().then(users=>{
            return users
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return usersPromise
    }

    async getUserById(id: string): Promise<UserDto | undefined>{
        const userPromise = await this._userRepository.getUserById(id).then(user=>{
            return user
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return userPromise
    }

    async getUserByEmail(email: string): Promise<UserDto | undefined>{
        const userPromise = await this._userRepository.getUserByEmail(email).then(user=>{
            return user
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return userPromise
    }

    async logIn(email: string, password: string): Promise<UserDto | undefined>{
        console.log('HOLA HOLA')
        console.log(email)
        const userPromise = await this.getUserByEmail(email).then(user=>{
            if(user?.password==password){
                console.log(user.password)
                return user
            }
            else{
                return undefined
            }
        }).catch(error=>{
            console.error(error)
            throw error
        })
        console.log('salimos del service')
        return userPromise
    }
}