import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id:number = +req.query.id || 0;
    const person = new Person();
    const tz = +req.query.tz || null;

    try {
        let res = await person.getJobDescription(id, tz);
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