import { BaseModel } from "./BaseModel";
import * as sql  from 'mssql';

export class Person extends BaseModel {
    
    constructor(id?){
        super();
        if (id) {
            this.id = id;
        }
        
    }

    public getPersonDetails(id?): Promise<Object> {
        return new Promise((resolve, reject) => {
            let personId = this.id;
                if(id) {
                    personId = id;
                }                
                let query = `SELECT * FROM dbo.tblPersons WHERE intPersonID = ${personId}`;
                this.pool.then(() => {
                    return sql.query(query);
               }).then(result => {
                   resolve(result.recordset[0]);
               }).catch(e => {
                   reject(e);
               });    
        });        
    }
    public closeConnection() {
        this.pool.then(() => {
            return sql.close();
        });
    }
}