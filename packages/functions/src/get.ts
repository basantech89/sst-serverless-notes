import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { getItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function getNote(event: APIGatewayProxyEventV2) {
  const response = await getItem({
    userId: '123',
    noteId: event.pathParameters?.id
  })

  return JSON.stringify(response.Item)
}

export const main = handler(getNote)
