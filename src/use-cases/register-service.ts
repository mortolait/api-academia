import { serviceRepository } from "@/repositories/service-repository";
interface serviceRquestBody {
    title: string
    description: string
    amount: number
    user_id: string
    code: string
    active: boolean
}
export class RegisterServiceUseCase {
    constructor(private serviceRepository: serviceRepository) { }

    async execute({
        title,
        description,
        active,
        amount,
        code,
        user_id
    }: serviceRquestBody) {
        const service = await this.serviceRepository.create(
            {
                title,
                description,
                active,
                amount,
                code,
                user_id
            }
        )

        return {
            service
        }
    }
}