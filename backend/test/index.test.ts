import axios from "axios"

test('Deve registrar um usuario', async () => {
    const id = new Date().toLocaleTimeString().replace(/:/g, '');
    const input = {
        "nome": "adriane",
        "email": `adriane_${id}@email.com`,
        "senha": "123456"
    }

    const response = await axios.post('http://localhost:4000/api/usuarios/registrar', input)
    expect(response.status).toEqual(201)
})

test('Deve registrar um usuario', async () => {
    const id = new Date().toLocaleTimeString().replace(/:/g, '')
    const nome = "adriane"
    const email = `${nome}_${id}@email.com`
    const senha = "123456"
    const input = { nome, email, senha }

    const objetoEsperado = {
        usuario: {
          id: expect.any(String),
          nome: nome,
          email: email
        },
        token: expect.any(String)
    }
  
    const response = await axios.post('http://localhost:4000/api/usuarios/login', input)
    expect(response.data).toMatchObject(objetoEsperado)
})
