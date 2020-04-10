import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log("processing....", event)
  const docClient = new AWS.DynamoDB.DocumentClient()

  const todosTable = process.env.TODOS_TABLE
  //const todoIdIndex = process.env.TODOS_ID_INDEX
  //const tokenUser=''

  //const imageId = event.pathParameters.imageId

  const result = await docClient.scan({
      TableName : todosTable
      
      
  }).promise()

  /*const result = await docClient.get({
    TableName : todosTable,
    Key: {
      id: todoIdIndex
    }
  }).promise*/



  const items = result.Items
  if (result.Count !== 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
       
        
       
      },
      body: JSON.stringify(items)
    }
  }

  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
