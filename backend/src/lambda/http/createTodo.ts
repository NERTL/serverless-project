import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import  * as uuid from 'uuid'
import * as AWS from 'aws-sdk'
//import { getUserId } from '../utils'
import { parseUserId } from '../../auth/utils'

const docClient =  new AWS.DynamoDB.DocumentClient()
const todosTable= process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const ItemId= uuid.v4()
  const timestamp = new Date().toISOString()

  const newTodo: CreateTodoRequest = JSON.parse(
    
    event.body
    )
  const authorization = event.headers.Authorization
  const split= authorization.split(' ')
  const jwtToken=split[1];

  
  const newItem={
    todoId:ItemId,
    createdAt:timestamp,
    idUser:parseUserId(jwtToken),
    ...newTodo
  }

  await docClient.put({
    TableName: todosTable,
    Item: newItem

  }).promise



    return {
      statusCode:201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization'
      },
      body: JSON.stringify({
        newItem
      })
    }
}
