export class CashRegisterIsNotOpenError extends Error{
    constructor(){
        super('No open cash register for the day')
    }
}