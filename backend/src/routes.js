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

// Passando middleware de forma local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;