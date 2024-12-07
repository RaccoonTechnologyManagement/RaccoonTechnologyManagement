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
import categoriesHardwareController from './app/controllers/categoriesHardwareController';
import subCategoriesHardwareController from './app/controllers/subCategoriesHardwareController';
import categoriesServerController from './app/controllers/categoriesServerController';
import statusAssetController from './app/controllers/statusAssetController';
import serverAssetController from './app/controllers/serverAssetController';
import hardwareAssetController from './app/controllers/hardwareAssetController';
import serverAssetMonitoringController from './app/controllers/serverAssetMonitoringController';

const routes = new Router();

routes.get('/teste', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/users', UserController.store);
routes.post('/sessions', sessionController.store);
routes.post('/token', sessionController.generateTokenMonitor);

// Todas rotas que estiverem abaixo, necessitaram de token para serem usadas.
routes.use(authMiddleware);

routes.get('/commentsTickets', commentsTicketsController.index);
routes.put('/users', UserController.update);
routes.post('/persons', personController.store);
routes.get('/persons', personController.index);
routes.get('/getInfoPerson', personController.getPerson);
routes.get('/getPersonTechnical', personController.getPersonTechnical);

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
routes.get('/getBranchesByCompany', branchesController.getBranchesByCompany);

routes.post('/relBranchesDepartaments', relBranchesDepartamentsController.store);
routes.get('/relBranchesDepartaments', relBranchesDepartamentsController.index);

routes.post('/relCompanysBranches', relCompanysBranchesController.store);
routes.get('/relCompanysBranches', relCompanysBranchesController.index);

routes.post('/relPersonsDepartaments', relPersonsDepartamentsController.store);
routes.get('/relPersonsDepartaments', relPersonsDepartamentsController.index);

routes.post('/relDepartamentsTickets', relDepartamentsTicketsController.store);
routes.get('/relDepartamentsTickets', relDepartamentsTicketsController.index);

routes.post('/categorieshardware', categoriesHardwareController.store);
routes.get('/categorieshardware', categoriesHardwareController.index);

routes.post('/subCategoriesHardware', subCategoriesHardwareController.store);
routes.get('/subCategoriesHardware', subCategoriesHardwareController.index);

routes.post('/categoriesServer', categoriesServerController.store);
routes.get('/categoriesServer', categoriesServerController.index);

routes.post('/statusAsset', statusAssetController.store);
routes.get('/statusAsset', statusAssetController.index);

routes.post('/serverAsset', serverAssetController.store);
routes.get('/serverAsset', serverAssetController.index);
routes.get('/serverAssetOne', serverAssetController.getOneServerAsset);
routes.delete('/serverDelete', serverAssetController.delete);
routes.put('/serverAsset', serverAssetController.update);

routes.post('/hardwareAsset', hardwareAssetController.store);
routes.get('/hardwareAsset', hardwareAssetController.index);
routes.get('/hardwareAssetOne', hardwareAssetController.getOneHardwareAsset);
routes.delete('/hardwareDelete', hardwareAssetController.delete);
routes.put('/hardwareAsset', hardwareAssetController.update);

routes.post('/serverMonitoring', serverAssetMonitoringController.store);
routes.get('/serverMonitoring', serverAssetMonitoringController.index);
routes.put('/serverMonitoring', serverAssetMonitoringController.update);


// Passando middleware de forma local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;