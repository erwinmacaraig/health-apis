import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let personID:number = 0;
    const timeZone = +req.query.timeZone || null;
    personID = +req.query.personID || 0;

    let errorMessages:Array<Object> = [];
    if (!personID) {
        errorMessages.push({
            error: 'Invalid person id'
        });
    }

    if (errorMessages.length > 0) {
        context.res = {
            status: 400, 
            body: errorMessages,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return;
    }
    try {
        const person = new Person();       
        let res = await person.getPersonalConsumers(personID, timeZone);
        context.res = {
            status: 200,
            body: res,
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
    } catch(e) {
        context.log(e);
        context.res = {
            status: 400, 
            body: e,
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
    }


};

export default httpTrigger;