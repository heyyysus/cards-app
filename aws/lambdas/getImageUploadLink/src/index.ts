import { APIGatewayProxyResult } from "aws-lambda";
import { APIEvent, RequestContext } from "./types";
import { S3 } from "aws-sdk";
import config from './config';

class InvalidExtensionError extends Error {};

const isValidExtension = (ext: string) => {
    if(!ext) return false;
    const l_ext = ext.toLowerCase();
    if(l_ext === 'png' || l_ext === 'jpg' || l_ext === 'jpeg')
        return true;
    return false;
}

const createPresignedImageUploadUrl = async (user_id: string, extension: string) => {
    const s3 = new S3();
    const region = "us-west-2";
    const bucket = "hoppin-app-static";
    const filename = `${user_id}.${extension}`;
    const key = `images/profile/${filename}`;
    const presignedUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: bucket,
        Key: key,
        Expires: 100,
        ContentType: `image/${extension}`
    });

    return { url: presignedUrl, filename: filename }
    
  };
  

export const handler = async (event: APIEvent, context: RequestContext): Promise<APIGatewayProxyResult> => {
    try {
        const method = event.requestContext.http.method;
        const sub = event.requestContext.authorizer.jwt.claims.sub;
        switch(method){
        case "GET":
            const extension = event.queryStringParameters?.extension || undefined;
            if(!isValidExtension(extension)) throw new InvalidExtensionError;

            const signedUrl = await createPresignedImageUploadUrl(sub, extension);
            console.log(signedUrl);
            return {
                statusCode: 200,
                body: JSON.stringify(signedUrl)
            };
        }
    } catch(e){
        console.log(e);
        if(e instanceof InvalidExtensionError)
            return {
                statusCode: 400,
                body: "Invalid Extension Type"
            };
        return { 
            statusCode: 500,
            body: "Internal Error"
        }
    }
}