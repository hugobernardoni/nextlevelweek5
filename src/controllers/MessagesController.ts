import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";


class MessagesController {

    async create(req: Request, res: Response): Promise<Response> {

        try {
            const { admin_id, user_id, text } = req.body;

            const messagesService = new MessagesService();
            const message = await messagesService.create({ admin_id, user_id, text });

            return res.json(message);
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async listByUser(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params;

            const messagesService = new MessagesService();
            const messages = await messagesService.litsByUser(id);

            return res.json(messages);
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

}

export { MessagesController }