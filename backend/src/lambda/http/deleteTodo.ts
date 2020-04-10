import 'source-map-support/register'

import * as AWS from 'aws-sdk'

const docClient =  new AWS.DynamoDB.DocumentClient()
const todosTable= process.env.TODOS_TABLE

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  var params = {
    TableName:todosTable,
    Key:{
        "id": todoId         
    },
    ConditionExpression:"id == :val",
    ExpressionAttributeValues: {
        ":val": todoId
    }
};

  docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});

return {
  statusCode: 201,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: ''
}
}
