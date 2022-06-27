import * as sql  from 'mssql';
import configDb from '../config/conf'; 

export abstract class BaseModel {
    protected pool:sql.ConnectionPool = sql.connect(configDb);
    protected personID: number;
    // protected noticeID: number;
    // protected scheduledEventID: number;
    protected dbFields:object;

    public ID(): number {
        return this.personID;
        // , this.noticeID, this.scheduledEventID;
    }

    protected abstract closeConnection();

    protected abstract load();

    

}