import {Request, Response} from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import ClientesModel from "../modelsNOSQL/clientesNOSQL";

class ClientesController extends AbstractController{

    private static _instance: ClientesController;

    public static get instance(): ClientesController{
        if(!this._instance) {
            this._instance = new ClientesController("cliente");
        }
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.get('/testcliente',this.getTestCliente.bind(this));
        this.router.post('/crearCliente',this.postCrearCliente.bind(this));
        this.router.get('/consultarClientes',this.getConsultarClientes.bind(this));
    }


    private async getConsultarClientes(req: Request,res: Response){
        try{
            const clientes = await ClientesModel.scan().exec().promise();
            res.status(200).send(clientes);
        }
        catch(err:any){
            console.log(err);
            res.status(500).send('Error en el servidor'+err);
        }
    }


    private async postCrearCliente(req: Request,res: Response){
        try{
            console.log(req.body);
            await ClientesModel.create(req.body);
            console.log('Cliente creado');
            res.status(201).send("<h1>Cliente creado</h1>");
        }
        catch(err:any){
            console.log(err);
            res.status(500).send('Error en el servidor'+err);
        }
    }



    private getTestCliente(req: Request,res: Response){
        try{
            console.log('Esto es un test exitoso');
            res.status(200).send('Esto es un test exitoso');
        }
        catch(err:any){
            console.log(err);
            res.status(500).send('Error en el servidor'+err);
        }
    }

}

export default ClientesController;