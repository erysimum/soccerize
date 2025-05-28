import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddb = DynamoDBDocumentClient.from(client);

const CONNECTION_TABLE = process.env.CONNECTION_TABLE;
const ENDPOINT = process.env.ENDPOINT;

const apigw = new ApiGatewayManagementApi({
  endpoint: ENDPOINT, // e.g. https://abc123.execute-api.us-east-1.amazonaws.com/dev
  region: "us-east-1",
});

export const handler = async (event) => {
  console.log("📥 DynamoDB Stream Event:", JSON.stringify(event));

   if (!CONNECTION_TABLE || !ENDPOINT) {
    throw new Error("Missing env vars: CONNECTION_TABLE or ENDPOINT");
  }

  const { Items: connections = [] } = await ddb.send(new ScanCommand({
    TableName: CONNECTION_TABLE,
  }));

  for (const record of event.Records) {
    if (record.eventName !== "INSERT") continue;

    const newImage = record.dynamodb.NewImage;
    const message = JSON.stringify({ commentary: newImage.commentary.S });

    for (const conn of connections) {
      const connectionId = conn.connectionId;

      try {
        await apigw.postToConnection({
          ConnectionId: connectionId,
          Data: message,
        });
      } catch (err) {
        if (err.statusCode === 410) {
          console.log(`🔌 Stale connection, deleting ${connectionId}`);
          await ddb.send(new DeleteCommand({
            TableName: CONNECTION_TABLE,
            Key: { connectionId },
          }));
        } else {
          console.error(` Failed to send message to ${connectionId}:`, err);
        }
      }
    }
  }

  return { statusCode: 200, body: "Messages broadcasted" };
};
