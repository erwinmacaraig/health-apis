import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const personID:number = +req.query.personID || 0;
    const person = new Person();
    const timeZone = +req.query.timeZone || null;
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
        let res = await person.getJobDescription(personID, timeZone);
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