import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request for a token.');

    const jwtSK = process.env.JWT_SECRET_KEY;
    let data = {
        userId: 1423,
        tk: 'sdnfskewrpuALaUO'
    };

    const token = jwt.sign(data, jwtSK, { expiresIn: '3650d' });


    context.res = {
        status: 200, /* Defaults to 200 */
        body: token
    };

};

export default httpTrigger;