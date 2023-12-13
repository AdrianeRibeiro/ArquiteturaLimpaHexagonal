import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import RepositorioUsuarioPg from './external/database/RepositorioUsuarioPg'
import SenhaCripto from './external/auth/SenhaCripto'
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController'
import LoginUsuarioController from './external/api/LoginUsuarioController'
import LoginUsuario from './core/usuario/service/LoginUsuario'
import ObterProdutoPorId from './core/produto/service/ObterProdutoPorId'
import ObterProdutoPorIdControllerController from './external/api/ObterProdutoPorIdController'
import UsuarioMiddleware from './external/api/UsuarioMiddleware'
import PgPromiseAdapter from './external/database/PgPromiseAdapter'

const app = express()
const porta = process.env.API_PORT ?? 4000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(porta, () => {
    console.log(`🔥 Servidor rodando na 🚪 ${porta}`)
})

const db = new PgPromiseAdapter()
const repositorioUsuario = new RepositorioUsuarioPg(db)
const provedorCripto = new SenhaCripto()
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCripto)

const loginUsuario = new LoginUsuario(
    repositorioUsuario,
    provedorCripto
)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

const usuarioMid = UsuarioMiddleware(repositorioUsuario)

const obterProdutoPorId = new ObterProdutoPorId()
new ObterProdutoPorIdControllerController(app, obterProdutoPorId, usuarioMid)