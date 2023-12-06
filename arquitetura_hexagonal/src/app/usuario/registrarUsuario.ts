import Usuario from "@/core/usuario/model/Usuario"
import TerminalUtil from "../util/TerminalUtil"
import RegistrarUsuario from "@/core/usuario/service/RegistrarUsuario"
import InverterSenhaCripto from "@/adapter/auth/InverterSenhaCripto"
import RepositorioUsuarioPg from "@/adapter/database/RepositorioUsuarioPg"

export default async function registrarUsuario() {
    const { campoRequerido, titulo, sucesso, erro, esperarEnter } = TerminalUtil

    titulo("Registrar Usuário")

    const nome = await campoRequerido("Nome: ")
    const email = await campoRequerido("Email: ")
    const senha = await campoRequerido("Senha: ")

    const usuario: Usuario = { nome, email, senha }

    try {
        const repositorio = new RepositorioUsuarioPg()
        const provedorCripto = new InverterSenhaCripto()
        const casoDeUso = await new RegistrarUsuario(repositorio, provedorCripto)

        await casoDeUso.executar(usuario)

        sucesso('Usuário registrado com sucesso')
    } catch (e: any) {
        erro(e.message)  
    } finally {
        await esperarEnter()
    }
}