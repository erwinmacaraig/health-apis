import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = +req.query.id || 0;
    const tz = +req.query.tz || null;
    let errorMessages:Array<Object> = [];
    
    if (!id) {
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
        let res = await person.getScheduledEvent(id, tz);
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