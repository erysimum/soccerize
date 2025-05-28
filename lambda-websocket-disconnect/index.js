import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.CONNECTION_TABLE;

export const handler = async (event) => {
  console.log(" Disconnect event:", JSON.stringify(event));

  const connectionId = event.requestContext.connectionId;

  try {
    await ddb.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { connectionId },
    }));

    return {
      statusCode: 200,
      body: "Disconnected",
    };
  } catch (err) {
    console.error(" Failed to delete connectionId:", err);
    return {
      statusCode: 500,
      body: "Failed to disconnect",
    };
  }
};
