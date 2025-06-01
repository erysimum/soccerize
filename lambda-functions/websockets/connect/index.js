// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
//Lambda by default uses CommonJS so have to change ESModule to CommonJS
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.CONNECTION_TABLE;

// export const handler = async (event) => {
exports.handler = async (event) => { 
  console.log(" Connect event:", JSON.stringify(event));

  const connectionId = event.requestContext.connectionId;

  try {
    await ddb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: { connectionId },
    }));

    return {
      statusCode: 200,
      body: "Connected",
    };
  } catch (err) {
    console.error("Failed to save connectionId:", err);
    return {
      statusCode: 500,
      body: "Failed to connect",
    };
  }
};
