import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const personID = +req.query.personID || 0;
    const endDate = req.query.endDate || null;
    const timeZone = +req.query.timeZone || null;
    let errorMessages:Array<Object> = [];
    
    if (!personID) {
        errorMessages.push({
            error: 'Invalid person id'
        });
    }
    if ((!endDate) && new Date(endDate).toString() == 'Invalid Date'){
        errorMessages.push({
            error: 'Invalid End Date'
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
        let res = await person.getScheduledEventsAvailable(personID, endDate, timeZone);
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