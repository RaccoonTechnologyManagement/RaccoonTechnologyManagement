import Ticket from '../models/ticket';
import RelPrioritysTickets from '../models/relPrioritysTickets';
import PrioritysTickets from '../models/prioritysTickets';
import RelPersonsTickets from '../models/relPersonsTickets';
import Person from '../models/person';
import RelDepartamentsTickets from '../models/relDepartamentsTickets';
import Departaments from '../models/departaments';
import RelBranchesDepartaments from '../models/relBranchesDepartaments';
import Branches from '../models/branches';
import RelCompanysBranches from '../models/relCompanysBranches';
import Companys from '../models/companys';
import RelCategorysTickets from '../models/relCategorysTickets';
import CategorysTickets from '../models/categorysTickets';
import RelStatusTickets from '../models/relStatusTickets'
import StatusTickets from '../models/statusTickets';
import personController from './personController';

import Sequelize from 'sequelize';
import { formatResponseMenuTicket, formatResponseTicket, transformarDataEmTimestamp } from '../../functions/functions';
import * as Yup from 'yup';

class ticketController {

    async index(req, res) {
        let responseTickets = [];

        const menu = req.query.menu;

        let conditionAccountable = '';
        let conditionStatus = '';
        let conditionPriority = '';
        let conditionExp = '';

        if(menu == 1)
        {
            conditionAccountable = "id_person_accountable > 0";
            conditionStatus = "id_status IN (1,2)";
            conditionPriority = "id_priority > 0"
        }
        else if(menu == 2)
        {
            conditionAccountable = "id_person_accountable = 1";
            conditionStatus = "id_status IN (1,2)";
            conditionPriority = "id_priority > 0"
        }
        else if(menu == 3)
        {
            conditionAccountable = "id_person_accountable > 0";
            conditionStatus = "id_status IN (1,2)";
            conditionPriority = "id_priority = 3"
        }
        else if(menu == 4)
        {
            conditionAccountable = "id_person_accountable > 0";
            conditionStatus = "id_status IN (1,2)";
            conditionExp = `DATE(exp_finish_at) BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '3 days'`;
        }
        else if(menu == 5)
        {
            conditionAccountable = "id_person_accountable > 0";
            conditionStatus = "id_status IN (1,2)";
            conditionExp = `DATE(exp_finish_at) < DATE(NOW())`;
        }
        else if(menu == 6)
        {
            conditionStatus = "id_status = 3";
        }

        const include = {
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
                    where: Sequelize.literal(conditionPriority),
                    include: [{
                        model: PrioritysTickets,
                        as: 'priority',
                        attributes: ['priority']
                    }]
                },
                {
                    model: RelPersonsTickets,
                    as: 'personsTickets',
                    where: Sequelize.literal(conditionAccountable),
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
                {
                    model: RelStatusTickets,
                    as: 'status',
                    where: Sequelize.literal(conditionStatus),
                    include: [{
                        model: StatusTickets,
                        as: 'status',
                        attributes: ['status']
                    }]
                }
            ]
        };

        const tickets = await Ticket.findAll({
            ...include,
            where: Sequelize.literal(conditionExp)
        });
        
        responseTickets = formatResponseMenuTicket(tickets, menu);

        return res.json(responseTickets);
    }

    async store(req, res) {

        console.log(req.body)
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

        const id_person = await personController.getPersonByUserId(req.userId);

        await RelPersonsTickets.create({
            id_ticket: ticket.id,
            id_person_creator: id_person,
            id_person_accountable: 1
        });

        return res.json(ticket);
    }

    async update(req, res){

        if(req.body.id_status == 4)
        {
            const statusUpdate = await RelStatusTickets.update(
                { id_status: req.body.id_status },
                { where: { id_ticket: req.body.id_ticket }}
            );

            return res.json(statusUpdate);
        }

        await Ticket.update(
            {
                exp_finish_at: transformarDataEmTimestamp(req.body.dateExp),
            },
            { where: { id: req.body.id_ticket }}
        );

        await RelPrioritysTickets.update(
            { id_priority: req.body.id_priority },
            { where: { id_ticket: req.body.id_ticket }}
        );

        await RelCategorysTickets.update(
            { id_category: req.body.id_category },
            { where: { id_ticket: req.body.id_ticket }}
        );

        await RelStatusTickets.update(
            { id_status: req.body.id_status },
            { where: { id_ticket: req.body.id_ticket }}
        );

        return res.json("ok");
    }

    async getOneTicket(req, res) {
        let responseTickets = [];

        const include = {
            include: [
                {
                    model: RelCategorysTickets,
                    as: 'category',
                    include: [{
                        model: CategorysTickets,
                        as: 'category',
                        attributes: ['id']
                    }]
                },
                {
                    model: RelPrioritysTickets,
                    as: 'priority',
                    include: [{
                        model: PrioritysTickets,
                        as: 'priority',
                        attributes: ['id']
                    }]
                },
                {
                    model: RelPersonsTickets,
                    as: 'personsTickets',
                    include: [{
                        model: Person,
                        as: 'accountable',
                        attributes: ['id']
                    }]
                },
                {
                    model: RelPersonsTickets,
                    as: 'personsTickets',
                    include: [{
                        model: Person,
                        as: 'creator',
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
                {
                    model: RelStatusTickets,
                    as: 'status',
                    include: [{
                        model: StatusTickets,
                        as: 'status',
                        attributes: ['id']
                    }]
                }
            ]
        };

        const tickets = await Ticket.findOne({
            ...include,
            where: {
                id: req.query.id_ticket,
            }
        });

        responseTickets = formatResponseTicket(tickets);
        console.log(responseTickets);
        return res.json(responseTickets);
    }

}

export default new ticketController();