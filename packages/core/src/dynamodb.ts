import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Table } from 'sst/node/table'

const dbClient = new DynamoDBClient({ region: 'us-east-1' })
const docClient = DynamoDBDocumentClient.from(dbClient)

const TableName = Table.Notes.tableName

type Dict = Record<string, unknown>

const createItem = async (Item: Dict) => {
  const command = new PutCommand({ TableName, Item })
  return await docClient.send(command)
}

const deleteItem = async (Key: Dict) => {
  const command = new DeleteCommand({ TableName, Key })
  return await docClient.send(command)
}

export { createItem, deleteItem }
