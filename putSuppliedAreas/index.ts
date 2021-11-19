import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger putSuppliedAreas function processed.');
    if (req.method === 'POST') {
        let personId;
        let governmentAreaArrStr='';        // chvLocalGovernmentAreaArray
        let suppliedServiceGrpInt = 0;      // intSuppliedServiceGroupID
        let supplierAddressIdInt = null;    // supplierAddressIdInt
        let modifiedByIdInt;                // intModifiedByID
        let errorMessages:Array<Object> = [];

        if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && parseInt(req.body.intPersonID, 10) > 0) {
            personId = +req.body.intPersonID;
            modifiedByIdInt = personId;            
        } else {
            errorMessages.push({
                error: "Invalid person id"
            })
        }
        
        if (req.body.chvLocalGovernmentAreaArray) {
            
            if ( (typeof req.body.chvLocalGovernmentAreaArray) == 'string' && (req.body.chvLocalGovernmentAreaArray as string).trim().length > 0) {
                governmentAreaArrStr = req.body.chvLocalGovernmentAreaArray;
                context.log('*****', typeof req.body.chvLocalGovernmentAreaArray);
            } 
            
        }
        if (req.body.intSuppliedServiceGroupID) {
            if (Number.isInteger(+req.body.intSuppliedServiceGroupID)){
                suppliedServiceGrpInt = +req.body.intSuppliedServiceGroupID;                
            }
        }
        if (req.body.intSupplierAddressID) {
            if (Number.isInteger(+req.body.intSupplierAddressID)) {
                supplierAddressIdInt = +req.body.intSupplierAddressID;               
            }
        }
        
        if (req.body.intModifiedByID) {
            if (Number.isInteger(+req.body.intModifiedByID)) {
                modifiedByIdInt = +req.body.intModifiedByID;
            }
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
        } else {
            const person = new Person();
            try {
                await person.putSuppliedAreas(personId, governmentAreaArrStr, suppliedServiceGrpInt, supplierAddressIdInt, modifiedByIdInt);
                context.res = {
                    status: 200, 
                    body: 'Success',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

            } catch(e) {
                context.res = {
                    status: 400, 
                    body: e,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
            return;
             
        }
        
    } else {
        context.res = {
            status: 405, 
            body: 'Method not allowed',
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
    }

};

export default httpTrigger;