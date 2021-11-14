import * as sql  from 'mssql';
import configDb from '../config/conf'; 

export abstract class BaseModel {
    protected pool:sql.ConnectionPool = sql.connect(configDb);
    protected id: number;


    public ID(): number {
        return this.id;
    }

    protected abstract closeConnection();
    

}