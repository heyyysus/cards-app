import { APIGatewayProxyResult } from "aws-lambda";
import { APIEvent, RequestContext } from "./types";
import AWS from 'aws-sdk';
import multipart from 'aws-lambda-multipart-parser';
import config from './config';

const s3 = new AWS.S3({
    accessKeyId:config?.dev?.aws_s3?.ACCESS_KEY,
    secretAccessKey:config?.dev?.aws_s3?.SECRET_KEY
  })


export const handler = async (event: APIEvent, context: RequestContext): Promise<APIGatewayProxyResult> => {
    try {
        if(event.requestContext.http.method !== "PATCH"){
            
        } 
    } catch(e){
        console.log(e);
        return { 
            statusCode: 500,
            body: "Internal Error"
        }
    }
}