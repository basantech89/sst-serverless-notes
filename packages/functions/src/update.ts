import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { updateItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function updateNote(event: APIGatewayProxyEventV2) {
  if (!event.body) {
    return JSON.stringify({ error: 'No event body' })
  }
  
  const data = JSON.parse(event.body)

  const response = await updateItem({
    Key: {
      userId: '123',
      noteId: event?.pathParameters?.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':content': data.content || null,
      ':attachment': data.attachment || null
    },
    ReturnValues: 'ALL_NEW'
  })

  return JSON.stringify(response.Attributes)
}

export const main = handler(updateNote)
