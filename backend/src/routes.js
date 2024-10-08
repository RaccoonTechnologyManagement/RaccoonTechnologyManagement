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

const routes = new Router();

routes.get('/teste', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/users', UserController.store);
routes.post('/sessions', sessionController.store);

// Todas rotas que estiverem abaixo, necessitaram de token para serem usadas.
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/persons', personController.store);
routes.get('/persons', personController.index);
routes.post('/tickets', ticketController.store);
routes.post('/categorysTickets', categorysTicketsController.store);

routes.post('/relCategorysTickets', relCategorysTicketsController.store);
routes.get('/relCategorysTickets', relCategorysTicketsController.index);
routes.put('/relCategorysTickets', relCategorysTicketsController.update);
routes.delete('/relCategorysTickets', relCategorysTicketsController.delete);

routes.post('/categorysPersons', categorysPersonsController.store);

routes.post('/relCategorysPersons', relCategorysPersonsController.store);

routes.post('/relPersonsTickets', relPersonsTicketsController.store);

routes.post('/commentsTickets', commentsTicketsController.store)
routes.get('/commentsTickets', commentsTicketsController.index)
// Passando middleware de forma local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;