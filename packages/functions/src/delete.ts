import type { APIGatewayProxyEvent } from 'aws-lambda'
import { deleteItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function deleteNote(event: APIGatewayProxyEvent) {
  const response = await deleteItem({
    userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    noteId: event?.pathParameters?.id
  })

  return JSON.stringify(response.Attributes)
}

export const main = handler(deleteNote)
