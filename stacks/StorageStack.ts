import { RemovalPolicy } from "aws-cdk-lib/core"
import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, 'Uploads', {
    cdk: {
      bucket: {
        removalPolicy: RemovalPolicy.DESTROY,
      }
    },
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      }
    ]
  })

  // Create the DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY
      }
    }
  })

  return {
    table,
    bucket
  }
}
