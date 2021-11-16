import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    let id:number;
        if (req.query.id) {
            id = +req.query.id;
            const person = new Person(id);
        try {
            let res = await person.getPersonDetails();
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
    /*
    if (req.method === 'POST') {
        
        const newPerson = new Person(null, context);
        try {
            
            newPerson.setFieldValues(req.body);
            let data = await newPerson.dbUpdate();

            context.res = {
                status:200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "message": data
                }
            };
        } catch(e){

            context.res = {
                status:400,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: e
            };
        }        
    } 
    */

};

export default httpTrigger;