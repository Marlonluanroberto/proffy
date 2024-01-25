import express from 'express';


import ClassesController from './controller/ClassesController';
import ConnectionController from './controller/ConnectionsController';


const routes = express.Router();
const classesController = new ClassesController();
const connectionsControler = new ConnectionController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsControler.index);
routes.post('/connections', connectionsControler.create);

export default routes;
