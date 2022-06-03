import express, { request, response }  from 'express'
import {v4 as uuid } from 'uuid'

const app = express()

app.use(express.json())

//criando rotas usando metodos HTTP | GET |POST|PUT| DELETE

// http://localhost:3333/users

//metodo get contempla 2 parametros, requisição e repostas

interface User {
    id: String
    name: String
    email: String
}

const users: User[] = []

app.get('/users', (request, response) => {
    //retornar usuarios
    return response.json(users)
})

app.post('/users', (request, response) => {
    //receber os dados do usuario
    const {name, email} =  request.body
    // criar um novo
    const user = {id: uuid(), name, email}
    //registrar na base de dados
    users.push(user)
    //retornar os dados criados
    return response.json(user)
})

app.put('/users/:id', (request, response) => {
   //receber os dados do usuario
   const { id  } = request.params
   const {name, email } = request.body
   

   //localizar usuario na base da dados
   const userIndex = users.findIndex((user) => user.id === id) // se não encontrar ele retorna -1
   //se o usuario nao existe retorn um erro
   if (userIndex < 0){
       return response.status(404).json({error: 'user not found'})
   }
   //atualizar o usuario
   const userNew = {id, name, email}
    users[userIndex] = userNew
   //retorna os dados atualizados.
    return  response.json(userNew)

})

app.delete('/users/:id', (request, response) => {
    //receber o id que vai ser deletado
    const { id  } = request.params
    //localizar usuario
    const userIndex = users.findIndex((user) => user.id === id)
    //retornar erro se nao existe
    if (userIndex < 0 ){
        return response.status(404).json({error: ' user not found'})
    }
    //exclui o usuario na base
    users.splice(userIndex, 1)

    // retorna sucesso
    return response.status(204).send()
    
})




app.listen('3333', () => {
    console.log("BACK-END STARTED!")
})