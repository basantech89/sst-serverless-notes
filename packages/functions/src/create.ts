import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'
import { createItem } from "@notes/core/dynamodb"
import handler from "@notes/core/handler"

async function createNote(event: APIGatewayProxyEventV2) {
  if (!event.body) {
    return JSON.stringify({ error: 'No event body' })
  }

  // Request body is passed in as a JSON encoded string in 'event.body'
  const { content, attachment }: { content: string, attachment: string } = JSON.parse(event.body)
  const response = await createItem({
    userId: '123456',
    noteId: uuidv4(),
    content,
    attachment,
    createdAt: Date.now().toString()
  })

  return JSON.stringify(response)
}

export const main = handler(createNote)