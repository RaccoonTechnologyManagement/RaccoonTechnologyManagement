import CommentsTickets from '../models/commentsTickets';
import personController from './personController';

class commentsTicketsController {

    async index(req, res) {
        console.log(req.body.id_ticket)
        const comments = await CommentsTickets.findAll({
            where: { id_ticket: req.body.id_ticket }
        });

        return res.json(comments);
    }

    async store(req, res) {
        const id_person = await personController.getPersonByUserId(req.userId);

        const commentsTickets = await CommentsTickets.create({
            id_ticket: req.body.id_ticket,
            id_person: id_person,
            comment: req.body.comment
        });

        return res.json(commentsTickets);
    }
}

export default new commentsTicketsController();