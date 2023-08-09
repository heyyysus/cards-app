import { APIGatewayProxyResult } from "aws-lambda";
import { createPlan, deletePlan, getAllPlans, getPlanById, getUserPlans } from "./plan.service";
import { APIEvent, Context } from "./types";


const cors = (a: any, origin: string) => {
    return {
        ... a,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': "Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Max-Age": "300",

        },
    };
}

const plans_handler = async (event: APIEvent, context: Context): Promise <APIGatewayProxyResult> => {
    const claims = event.requestContext.authorizer?.jwt?.claims || undefined;
    const plan_id = event.queryStringParameters?.plan_id || undefined;
    const user_id = event.queryStringParameters?.user_id || undefined;
    const action = event.queryStringParameters?.action || undefined;

    switch(event.requestContext.http.method){
        case "OPTIONS":
            return {
                statusCode: 200,
                body: "",
            };
        case "GET": 
            if(plan_id) return {
                statusCode: 200,
                body: JSON.stringify(await getPlanById(plan_id))
            }
            else if(user_id) return {
                statusCode: 200,
                body: JSON.stringify(await getUserPlans(user_id))
            };
            else return {
                statusCode: 200,
                body: JSON.stringify(await getAllPlans())
            }
        case "POST": 
            if(action) {
                return {
                    statusCode: 200,
                    body: "STUB"
                }
            } else {
                const newPlan = JSON.parse(event.body);
                return {
                    statusCode: 200,
                    body: JSON.stringify(await createPlan(newPlan, claims.sub))
                };
            }
        case "DELETE":
            if(!plan_id) return {
                statusCode: 400,
                body: "Missing plan_id"
            };

            const plan = await getPlanById(plan_id);

            if(!plan) return {
                statusCode: 404,
                body: "Plan not found"
            };

            if(plan.author.user_id !== claims.sub) return {
                statusCode: 403,
                body: "You are not the author of this plan"
            };

            const success = await deletePlan(plan_id);
            
            if(!success) return {
                statusCode: 500,
                body: "Failed to delete plan"
            };

            return {
                statusCode: 200,
                body: "Plan deleted"
            };

    }
}

export const handler = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const allowed_origin: string = "https://d29ba174zxs5ij.cloudfront.net";
    return cors(await plans_handler(event, context), allowed_origin);
}

