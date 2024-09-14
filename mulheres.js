const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
//const { v4: uuidv4 } = require('uuid');

const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir api no frontend
const conectaBancoDeDados = require('./bancoDeDados') //ligando ao arquivo banco de dados
conectaBancoDeDados() //chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 //iniciando a porta

//aqui estou criando a lista de mulheres sem conexao com banco de dados
/* const mulheres = [
    {
        id: '1',
        nome: 'Thalita Bernardes',
        imagem: 'https://avatars.githubusercontent.com/u/175446870?v=4',
        minibio: 'Desenvolvedora backend'
    },
    {
        id:'2',
        nome: 'Ana Maria',
        imagem: 'https://avatars.githubusercontent.com/u/175446870?v=4',
        minibio: 'Desenvolvedora backend Javascript'
    },
    {
        id: '3',
        nome: 'Iana Chan',
        imagem: 'https://avatars.githubusercontent.com/u/175446870?v=4',
        minibio: 'Fundadora da Programaria'
    }

] */

 /*    
//GET
function mostraMulheres(request, response){
    response.json(mulheres)
}

//POST
function criaMulher(request,response){
    const novaMulher ={
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

//PATCH
function corrigeMulher(request, response){
    function encontraMulher(mulher){
        if (mulher.id === request.params.id){
            return mulher
        }
    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if(request.body.nome){
        mulherEncontrada.nome = request.body.nome
    }
    if(request.body.imagem){
        mulherEncontrada.imagem = request.body.imagem
    }
    if(request.body.minibio){
        mulherEncontrada.minibio = request.body.minibio
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher(request,response){
    function todasMenosEla(mulher){
        if(mulher.id !== request.params.id){
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
}
 */

//GET com banco de dados
async function mostraMulheres(request, response){
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }
}

//POST com banco de dados
async function criaMulher(request,response){
    const novaMulher = new Mulher ({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH com banco de dados
async function corrigeMulher(request, response){
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }

        if(request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }

        const MulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(MulherAtualizadaNoBancoDeDados)

    } catch (erro){
        console.log(erro)
    }
    
}

//DELETE com banco de dados
async function deletaMulher(request,response){
    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({messagem: 'Mulher deletada com sucesso!'})
    } catch (erro) {
        console.log(erro)
    }
}

//PORTA
function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}
app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurei rota post /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei rota patch /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota delete /mulheres/:id
app.listen(porta, mostraPorta) //servidor ouvindo a porta

