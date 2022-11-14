import { Router } from "express";
import controller from "../controllers/controller.js";
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const json_swagger = JSON.parse(
    await readFile(
      new URL('../public/swagger.json', import.meta.url)
    )
);

const roteador = new Router()

roteador.use('/api-docs',swaggerUi.serve)
roteador.get('/api-docs', swaggerUi.setup(json_swagger))

roteador.get('/l/:link_encurtado',controller.acessarLink)
roteador.post('/registrar',controller.encurtarLink)
roteador.get('/registros',controller.listarEncurtamentos)
roteador.put('/desabilitar/:id_registro',controller.desativarEncurtamento)

export default roteador