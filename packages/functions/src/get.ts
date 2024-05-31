import type { APIGatewayProxyEvent } from 'aws-lambda'
import { getItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function getNote(event: APIGatewayProxyEvent) {
  const response = await getItem({
    userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    noteId: event.pathParameters?.id
  })

  return JSON.stringify(response.Item)
}

export const main = handler(getNote)
