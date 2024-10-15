import Ticket from '../models/ticket';
import RelCategorysTickets from '../models/relCategorysTickets';
import RelPrioritysTickets from '../models/relPrioritysTickets';
import RelPersonsTickets from '../models/relPersonsTickets';
import CategorysTickets from '../models/categorysTickets';
import PrioritysTickets from '../models/prioritysTickets';
import Person from '../models/person';
import RelDepartamentsTickets from '../models/relDepartamentsTickets';
import Departaments from '../models/departaments';
import RelBranchesDepartaments from '../models/relBranchesDepartaments';
import Branches from '../models/branches';
import RelCompanysBranches from '../models/relCompanysBranches';
import Companys from '../models/companys';
import RelStatusTickets from '../models/relStatusTickets';
import RelPersonsTickets from '../models/relPersonsTickets';

import sequelize from "sequelize";
import { formatResponseMenuTicket } from '../../functions/functions';
import * as Yup from 'yup'; // biblioteca de validação de campos

class ticketController {

    async index(req, res) {
        let responseTickets = [];

        const tickets = await Ticket.findAll({
            include: [
                {
                    model: RelCategorysTickets,
                    as: 'category',
                    include: [{
                        model: CategorysTickets,
                        as: 'category',
                        attributes: ['category']
                    }]
                },
                {
                    model: RelPrioritysTickets,
                    as: 'priority',
                    include: [{
                        model: PrioritysTickets,
                        as: 'priority',
                        attributes: ['priority']
                    }]
                },
                {
                    model: RelPersonsTickets,
                    as: 'personsTickets',
                    include: [{
                        model: Person,
                        as: 'accountable',
                        attributes: ['name']
                    }]
                },
                {
                    model: RelDepartamentsTickets,
                    as: 'departaments',
                    include: [{
                        model: Departaments,
                        as: 'departament',
                        attributes: ['department_name'],
                        include: [{
                            model: RelBranchesDepartaments,
                            as: 'relDepartament',
                            include: [{
                                model: Branches,
                                as: 'branch',
                                attributes: ['branch_name'],
                                include: [{
                                    model: RelCompanysBranches,
                                    as: 'relBranch',
                                    include: [{
                                        model: Companys,
                                        as: 'company',
                                        attributes: ['name']
                                    }]
                                }]
                            }]
                        }]
                    }]
                },
            ]
        });

        responseTickets = formatResponseMenuTicket(tickets, 1);
        return res.json(responseTickets);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            id_category: Yup.string().required(),
            id_priority: Yup.string().required(),
            id_departament: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const ticket = await Ticket.create({
            title: req.body.title,
            description: req.body.description
        });

        if(!ticket)
        {
            await transaction.rollback();
            return res.status(400).json({ error: 'Ticket não pôde ser criado' });
        }

        await RelDepartamentsTickets.create({
            id_ticket: ticket.id,
            id_departament: req.body.id_departament
        });

        await RelPrioritysTickets.create({
            id_ticket: ticket.id,
            id_priority: req.body.id_priority
        });

        await RelCategorysTickets.create({
            id_ticket: ticket.id,
            id_category: req.body.id_category
        });

        await RelStatusTickets.create({
            id_ticket: ticket.id,
            id_status: 1
        });

        await RelPersonsTickets.create({
            id_ticket: ticket.id,
            id_person_creator: req.body.id_person_creator,
            id_person_accountable: req.body.id_person_accountable
        });

        return res.json(ticket);
    }
}

export default new ticketController();