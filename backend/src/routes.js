import { Router } from 'express';

// Importando Middlewares
import authMiddleware from './app/middlewares/auth';

// Importando Controllers
import UserController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import personController from './app/controllers/personController';


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

// Passando middleware de forma local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;