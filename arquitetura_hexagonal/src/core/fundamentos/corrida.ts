import Carro from "./Carro";

export default function corrida(
    carro: Carro, 
    logger: (str: string) => void
    ) {

    Array.from({ length: 10 }).forEach(() => {
        carro.acelerar()
        logger(`\n Velocidade: ${carro.velocidadeAtual}`)
    })

    Array.from({ length: 10 }).forEach(() => {
        carro.frear()
        logger(`\n Velocidade: ${carro.velocidadeAtual}`)
    })
}