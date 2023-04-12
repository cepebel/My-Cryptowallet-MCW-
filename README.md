# My-Cryptowallet-MCW-Back

## Esquema de la base de datos:

![CryptoDDBB](https://user-images.githubusercontent.com/124666384/231604014-70fc3f44-5e28-421d-8538-38d5c9656813.png)

## API endpoints

### GET

`users` router.get('/all', userController.getAllUsers) <br/>
Devuelve todos los usuarios (hecha por defecto, no se usa. Posible implementación de control de usuarios) <br/>

`users` router.get('/get/:id', userController.getUserById) <br/>
Devuelve un objeto de tipo usuario <br/>

`users` router.get('/get/email/:email', userController.getUserByEmail) <br/>
Devuelve un objeto de tipo usuario <br/>

----------------------------------------------------------------------------------------------------------------------------------------------------

`coins` router.get('/all', coinController.getAllCoins) <br/>
Devuelve un array de objetos de tipo moneda <br/>

`coins` router.get('/get/:id', coinController.getCoinById) <br/>
Devuelve un objeto de tipo moneda <br/>

`coins` router.get('/get/join/:id', coinController.getJoinById) <br/>
Devuelve un objeto de tipo join <br/>

`coins` router.get('/get/join/all', coinController.getAllJoins) <br/>
Devuelve un array de objetos de tipo join <br/>

`coins` router.get('/get/join/user/:id', coinController.getUserJoins) <br/>
Devuelve un objeto de tipo join <br/>

`coins` router.get('/get/coins/user/:id', coinController.getUserCoins) <br/>
Devuelve un array de objetos de tipo moneda <br/>

`coins` router.get('/getAmount/:id', coinController.checkAmount) <br/>
Devuelve la cantidad disponible de la moneda <br/>

### POST

`users` router.post('/add', userController.addUser) <br/>
Devuelve 1 si el usuario ha sido añadido (registrado), -1 si ya contaba en la base de datos o hay espacios en blanco <br/>

`users` router.post('/login', userController.logIn) <br/>
Devuelve un objeto de tipo usuario, o undefined <br/>

`users` router.post('/update/budget', userController.updateBudget) <br/>
Devuelve el nuevo budget (número)

---------------------------------------------------------------------------------------------------------------------------------------------

`coins` router.post('/updateAmount', coinController.updateAmount) <br/>
Devuelve un booleano <br/>

`coins` router.post('/update', coinController.updateJoin) <br/>
Devuelve un string que dependiendo del resultado de la operación puede tener varios valores: <br/>
1. 'updated' (compra o venta) La operación se he realizado con éxito, el usuario ya tenía esa moneda
2. 'allsell' (venta) Significa que la cantidad de monedas que posee el usuario de la moneda es cero. Se elimina la fila de join
3. 'created' (compra) Compra por primera vez. Se crea nueva fila en la tabla join
4. 'impossible' (compra) No se realiza compra. No hay monedas disponibles
5. 'negative' (compra) Usuario en numeros rojos. No se realiza la compra
6. 'undefined' cualquier otro error

