import { APIGatewayProxyEventV2, Context } from "aws-lambda"

export default function handler(lambda: (event: APIGatewayProxyEventV2, context: Context) => Promise<string>) {
  return async function (event: APIGatewayProxyEventV2, context: Context) {
    let body, statusCode

    try {
      body = await lambda(event, context)
      statusCode = 200
    } catch (error) {
      body = JSON.stringify({ error: error instanceof Error ? error.message : String(error) })
      statusCode = 500;
    }

    return { body, statusCode }
  }
}