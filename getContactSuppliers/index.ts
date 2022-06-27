import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const personID:number = +req.query.personID || 0;
    let isActiveInt = 1;
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
    
    if (Number.isInteger(+req.query.intIsActive)) {
        isActiveInt = +req.query.intIsActive > 0 ? 1:0;
    }
    try {
        const person = new Person();
        const res = await person.getContactSuppliers(personID, isActiveInt);
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