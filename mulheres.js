const express = require("express")
const router = express.Router()

const app = express()

const porta = 3333

const mulheres = [
    {
        nome: 'Thalita Bernardes',
        imagem: 'https://avatars.githubusercontent.com/u/175446870?v=4',
        minibio: 'Desenvolvedora backend'
    },
    {
        nome: 'Ana Maria',
        imagem: 'https://avatars.githubusercontent.com/u/175446870?v=4',
        minibio: 'Desenvolvedora backend Javascript'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://avatars.githubusercontent.com/u/175446870?v=4',
        minibio: 'Fundadora da Programaria'
    }

]

function mostraMulheres(request, response){
    response.json(mulheres)
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}
app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)

