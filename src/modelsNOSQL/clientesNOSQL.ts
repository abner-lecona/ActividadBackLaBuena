import dynamodb from '../services/dynamoService';
import joi from 'joi';
import{PREFIX_NAME} from '../config';

const ClientesModel = dynamodb.define('Clientes', {
    hashKey: 'ClienteId',
    timestamps: false,
    schema: {
        ClienteId:dynamodb.types.uuid(),
        NombreMasc: joi.string(),
        NombreCliente: joi.string(),
        numContacto: joi.number(),
        Direccion: joi.string()
    },
    tableName:`Cliente${PREFIX_NAME}`,
});

dynamodb.createTables((err:any) => {
    if(err) 
        return console.log(err);
    console.log('Tabla creada correctamente');
})

export default ClientesModel;