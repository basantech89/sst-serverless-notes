import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { deleteItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function deleteNote(event: APIGatewayProxyEventV2) {
  const response = await deleteItem({
    userId: '123',
    noteId: event?.pathParameters?.id
  })

  return JSON.stringify(response.Attributes)
}

export const main = handler(deleteNote)
