import {Model,Sequelize} from 'sequelize';
// import AgenteController from '../controllers/AgenteController';

interface PaseosAttributes{
    id:number;
    nombre:string;
    tipo:string;
    raza:string;
}

module.exports = (sequelize:Sequelize, type:any) => {
    class PaseosModel extends Model<PaseosAttributes> implements PaseosAttributes{
        public id!: number;
        public nombre!: string;
        public tipo!: string;
        public raza!: string;
    }
    PaseosModel.init({
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: type.STRING,
            allowNull: false
        },
        tipo:{
            type: type.STRING,
            allowNull: false
        },
        raza:{
            type: type.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'paseos'
    });
    return PaseosModel;
}
