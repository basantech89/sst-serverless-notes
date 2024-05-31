import type { APIGatewayProxyEvent } from 'aws-lambda'
import { updateItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function updateNote(event: APIGatewayProxyEvent) {
  if (!event.body) {
    return JSON.stringify({ error: 'No event body' })
  }
  
  const data = JSON.parse(event.body)

  const response = await updateItem({
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
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
