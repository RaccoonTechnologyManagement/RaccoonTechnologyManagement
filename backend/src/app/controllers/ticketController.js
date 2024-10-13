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
            description: Yup.string().required() 
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos preenchidos de forma incorreta'})
        }

        const ticket = await Ticket.create({
            title: req.body.title,
            description: req.body.description
        });

        return res.json(ticket);
    }
}

export default new ticketController();