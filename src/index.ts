import express from 'express'; // está en minúsculas porque lo importamos como variable, no como interfaz. (interfaz en mayúsculas)
import userRouter from './routes/user.routes'
import coinRouter from './routes/coin.routes'

// para redirigir a los gatos .redirect()
const app = express()
app.use(express.json())

const PORT = 3142

app.get('/ping',(_req, res) =>{
    console.log('Se ha hecho ping!')
    const MESSAGE: string = 'Pong'
    res.send(MESSAGE)
})

app.use('/api/users', userRouter)

app.use('/api/courses', coinRouter)

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})