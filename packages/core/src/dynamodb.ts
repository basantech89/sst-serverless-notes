import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, QueryCommandInput, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
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

const getItem = async (Key: Dict) => {
  const command = new GetCommand({ TableName, Key })
  return await docClient.send(command)
}

const deleteItem = async (Key: Dict) => {
  const command = new DeleteCommand({ TableName, Key })
  return await docClient.send(command)
}

const listItems = async (props: Omit<QueryCommandInput, 'TableName'>) => {
  const command = new QueryCommand({ TableName, ...props })
  return await docClient.send(command)
}

const updateItem = async (props: Omit<UpdateCommandInput, 'TableName'>) => {
  const command = new UpdateCommand({ TableName, ...props })
  return await docClient.send(command)
}

export { createItem, deleteItem, getItem, listItems, updateItem }
