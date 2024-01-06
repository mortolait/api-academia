import { PrismaCashRegisterRepository } from '../../repositories/prisma/prisma-cash-register-repository'
import { GetCashRegister } from "../get-cash-register"

export function makeGetCashRegisterUseCase(){
    const prismaCashRegisterRepository = new PrismaCashRegisterRepository()
    const getCashRegister = new GetCashRegister(prismaCashRegisterRepository)
    return getCashRegister
}