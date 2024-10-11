import CommentsTickets from '../models/commentsTickets';
import Person from '../models/person';
import personController from './personController';

class commentsTicketsController {

    async index(req, res) {
        const comments = await CommentsTickets.findAll({
            where: { id_ticket: req.query.id_ticket },
            include: [{
                model: Person,
                as: 'person', // Usando o alias correto
                attributes: ['name']
            }]
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