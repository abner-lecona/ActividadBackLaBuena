import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class PaseosController extends AbstractController{

    private static _instance: PaseosController;

    public static get instance(): PaseosController{
        if(!this._instance) {
            this._instance = new PaseosController("paseo");}
            
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.get('/testpaseo',this.getTestPaseo.bind(this));
        this.router.post('/crearPaseo',this.postCrearPaseo.bind(this));
        this.router.get('/consultarPaseos',this.getConsultarPaseos.bind(this));
    }

    private getTestPaseo(req: Request,res: Response){
        try{
            console.log('Esto es un test exitoso');
            res.status(200).send('Esto es un test exitoso');
        }
        catch(err:any){
            console.log(err);
            res.status(500).send('Error en el servidor'+err);
        }
    }

    private async postCrearPaseo(req: Request,res: Response){
        try {
            console.log(req.body);
            await db.paseos.create(req.body);
            console.log('Paseo creado');
            res.status(201).send("<h1>Paseo creado</h1>");
        } catch (err:any) {
            console.log(err);
            res.status(500).send('Error en el servidor'+err);
        }
    }

    private async getConsultarPaseos(req: Request,res: Response){
        try {
            const paseos = await db.paseos.findAll();
            console.log(paseos);
            res.status(200).send(paseos);

        } catch(err: any) {
            console.log(err);
            res.status(500).send('Error en el servidor'+err);
        }
    }

}

export default PaseosController;