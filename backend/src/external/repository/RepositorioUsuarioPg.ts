import Usuario from "../../core/usuario/model/Usuario";

export default class RepositorioUsuarioPg {
    constructor(readonly db: any) {}

    async inserir(usuario: Usuario) {
        await this.db.query(
            `insert into usuarios
            (id, nome, email, senha)
            values($1, $2, $3, $4)`, 
            [usuario.id,
            usuario.nome,
            usuario.email,
            usuario.senha]
        )
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const result = await this.db.query('select * from usuarios where email = $1', email)
        const usuario =  result[0] || null

        if (!usuario) return null
        return usuario
    }
}