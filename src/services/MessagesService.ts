import { getCustomRepository } from 'typeorm';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface ImessageCreate {
    admin_id?: string;
    user_id: string;
    text: string;
}

class MessagesService {
    private messagesRepository;
    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, user_id, text }: ImessageCreate) {        

        const message = this.messagesRepository.create({
            admin_id,
            user_id,
            text
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async litsByUser(user_id: string) {
        
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });

        return list;
    }
}

export { MessagesService }