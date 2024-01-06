import { PrismaCashRegisterRepository } from '../../repositories/prisma/prisma-cash-register-repository'
import { CloseCashRegister } from '../close-cash-register'
export function makeCloseCashRgisterUseCase(){
    const prismaCashRegisterRepository = new PrismaCashRegisterRepository()
    const closeCashRegister = new CloseCashRegister(prismaCashRegisterRepository)
    return closeCashRegister
}