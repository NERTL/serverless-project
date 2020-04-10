import 'source-map-support/register'
//import * as AWS from 'aws-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
//import { loggers } from 'winston'

/*const s3= new AWS.S3({
  signatureVersion: 'v4'
})
const todotable = process.env.TODOS_TABLE
const bucketname = process.env.IMAGES_S3_BUCKET
const expiration = process.env.SIGNED_URL_EXPIRATION */

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
 // const todoId = event.pathParameters.todoId
 console.log(event)

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  /*return s3.getSignedUrl('putObject', {
    Bucket: bucketname

  })*/
  return undefined
}
