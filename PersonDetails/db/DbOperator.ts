
import * as sql  from 'mssql';
import configDb from '../config/conf'; 

import * as Promise from 'promise'; 

export class DbOperator {    
    constructor(){
    }
    public static getConnection(): Promise<sql.ConnectionPool> {
        return new Promise((resolve, reject) => {
            sql.connect(configDb).then(pool => {
                resolve(pool);
            }).catch(e => {
                reject(e);
            });
        });
    }
}