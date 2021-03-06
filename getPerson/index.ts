import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    let personID: number;
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
    if (req.query.personID) {
        personID = +req.query.personID;
        const person = new Person();
        const tz = req.query.tz || null;
        try {
            let res = await person.getPersonDetails(personID, tz);
            context.res = {
                status: 200,
                body: res,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } catch (e) {
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