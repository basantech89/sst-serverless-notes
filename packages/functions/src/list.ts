import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { listItems } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function listNotes(event: APIGatewayProxyEventV2) {
  const response = await listItems({
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': '123'
    },
  })

  return JSON.stringify(response.Items)
}

export const main = handler(listNotes)
