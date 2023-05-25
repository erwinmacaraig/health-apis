import { BaseModel } from "./BaseModel";
import * as sql from 'mssql';
import { reject, resolve } from "promise";
import { Context } from "@azure/functions";

export class UtilityHelper extends BaseModel {
    context: Context = null;
    constructor(context?) {
        super();
        if (context) {
            this.context = context;
        }
    }

    public load() {

    }

    public closeConnection() {
        this.pool.then((pool) => {
            return pool.close()
        });
    }

    public getConversationUsers(timeZone: number = 10): Promise<Array<Object>> {
        // spSelectConversationUsers
        return new Promise((resolve, reject) => {
            const queryRequest = new sql.Request();
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectConversationUsers');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

}