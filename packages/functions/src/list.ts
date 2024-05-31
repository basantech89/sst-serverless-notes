import type { APIGatewayProxyEvent } from 'aws-lambda'
import { listItems } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function listNotes(event: APIGatewayProxyEvent) {  
  const response = await listItems({
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer?.iam.cognitoIdentity.identityId
    },
  })

  return JSON.stringify(response)
}

export const main = handler(listNotes)
