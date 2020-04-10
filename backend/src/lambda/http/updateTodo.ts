import 'source-map-support/register'
import * as AWS from 'aws-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const docClient = new AWS.DynamoDB.DocumentClient() 
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const todosTable= process.env.TODOS_TABLE

  console.log(updatedTodo)
  console.log(todoId)

  var params = {
    TableName:todosTable,
    Key:{
      "id": todoId
      
  },
    
    UpdateExpression: "set name = :n, dueDate=:d, done=:a",
    ExpressionAttributeValues:{
        ":n":updatedTodo.name,
        ":d":updatedTodo.dueDate,
        ":a":updatedTodo.done
    },
    ReturnValues:"UPDATED_NEW"
};

  docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
