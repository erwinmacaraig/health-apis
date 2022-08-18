import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";
import { Utils } from "../models/Utils";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function get person details by email.');
    let email: string;
    const token = req.headers.authorization;
    if (!new Utils().validateAuthToken(token)) {
        context.res = {
            status: 400,
            body: 'Invalid token',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return;
    }

    if (req.body.email) {
        email = req.body.email;
        const person = new Person();
        try {
            let res = await person.getPersonDetailsByEmail(email);
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