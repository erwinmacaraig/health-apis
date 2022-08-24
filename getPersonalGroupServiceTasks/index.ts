import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let personID:number;
    if (req.query.personID) {
        personID = +req.query.personID;
        const person = new Person();
    try {
        let res = await person.getPersonalGroupServiceTasks(personID);
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
    } else {
        context.res = {
            status: 400, 
            body: 'Invalid parameter supplied',
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
    }

};

export default httpTrigger;