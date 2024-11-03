import { Router } from 'express';

// Importando Middlewares
import authMiddleware from './app/middlewares/auth';

// Importando Controllers
import UserController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import personController from './app/controllers/personController';
import ticketController from './app/controllers/ticketController';
import categorysTicketsController from './app/controllers/categorysTicketsController';
import relCategorysTicketsController from './app/controllers/relCategorysTicketsController';
import categorysPersonsController from './app/controllers/categorysPersonsController';
import relCategorysPersonsController from './app/controllers/relCategorysPersonsController';
import relPersonsTicketsController from './app/controllers/relPersonsTickets';
import commentsTicketsController from './app/controllers/commentsTicketsController';
import prioritysTicketsController from './app/controllers/prioritysTicketsController';
import relPrioritysTicketsController from './app/controllers/relPrioritysTicketsController';
import statusTicketsController from './app/controllers/statusTicketsController';
import relStatusTicketsController from './app/controllers/relStatusTicketsController';
import companysController from './app/controllers/companysController';
import departamentsController from './app/controllers/departamentsController';
import branchesController from './app/controllers/branchesController';
import relBranchesDepartamentsController from './app/controllers/relBranchesDepartamentsController';
import relCompanysBranchesController from './app/controllers/relCompanysBranchesController';
import relPersonsDepartamentsController from './app/controllers/relPersonsDepartamentsController';
import relDepartamentsTicketsController from './app/controllers/relDepartamentsTicketsController';

const routes = new Router();

routes.get('/teste', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/users', UserController.store);
routes.post('/sessions', sessionController.store);

// Todas rotas que estiverem abaixo, necessitaram de token para serem usadas.
routes.use(authMiddleware);

routes.get('/commentsTickets', commentsTicketsController.index);
routes.put('/users', UserController.update);
routes.post('/persons', personController.store);
routes.get('/persons', personController.index);

routes.post('/tickets', ticketController.store);
routes.get('/tickets', ticketController.index);
routes.get('/getInfoTicket', ticketController.getOneTicket);
routes.put('/tickets', ticketController.update);

routes.post('/categorysTickets', categorysTicketsController.store);
routes.get('/categorysTickets', categorysTicketsController.index);

routes.post('/relCategorysTickets', relCategorysTicketsController.store);
routes.get('/relCategorysTickets', relCategorysTicketsController.index);
routes.put('/relCategorysTickets', relCategorysTicketsController.update);
routes.delete('/relCategorysTickets', relCategorysTicketsController.delete);

routes.post('/categorysPersons', categorysPersonsController.store);
routes.get('/categorysPersons', categorysPersonsController.index);

routes.post('/relCategorysPersons', relCategorysPersonsController.store);

routes.post('/relPersonsTickets', relPersonsTicketsController.store);
routes.get('/relPersonsTickets', relPersonsTicketsController.index);

routes.post('/commentsTickets', commentsTicketsController.store);

routes.post('/prioritysTickets', prioritysTicketsController.store);
routes.get('/prioritysTickets', prioritysTicketsController.index);

routes.post('/relPrioritysTickets', relPrioritysTicketsController.store);
routes.get('/relPrioritysTickets', relPrioritysTicketsController.index);
routes.put('/relPrioritysTickets', relPrioritysTicketsController.update);
routes.delete('/relPrioritysTickets', relPrioritysTicketsController.delete);

routes.post('/statusTickets', statusTicketsController.store);
routes.get('/statusTickets', statusTicketsController.index);

routes.post('/relStatusTickets', relStatusTicketsController.store);
routes.get('/relStatusTickets', relStatusTicketsController.index);
routes.put('/relStatusTickets', relStatusTicketsController.update);
routes.delete('/relStatusTickets', relStatusTicketsController.delete);

routes.post('/companys', companysController.store);
routes.get('/companys', companysController.index);

routes.post('/departaments', departamentsController.store);
routes.get('/departaments', departamentsController.index);

routes.post('/branches', branchesController.store);
routes.get('/branches', branchesController.index);

routes.post('/relBranchesDepartaments', relBranchesDepartamentsController.store);
routes.get('/relBranchesDepartaments', relBranchesDepartamentsController.index);

routes.post('/relCompanysBranches', relCompanysBranchesController.store);
routes.get('/relCompanysBranches', relCompanysBranchesController.index);

routes.post('/relPersonsDepartaments', relPersonsDepartamentsController.store);
routes.get('/relPersonsDepartaments', relPersonsDepartamentsController.index);

routes.post('/relDepartamentsTickets', relDepartamentsTicketsController.store);
routes.get('/relDepartamentsTickets', relDepartamentsTicketsController.index);

// Passando middleware de forma local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;