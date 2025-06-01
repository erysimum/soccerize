// index.js (AWS SDK v3 version)
//from commentary folder->npm init -y
//form commentary folder-> npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb dotenv 

//Lambda Function by default uses CommonJS so have to change ESModule to CommonJS
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");


const client = new DynamoDBClient({region: "us-east-1" });
const ddb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME 

const formatTime = (s) =>
  `${Math.floor(s / 60)}'${String(s % 60).padStart(2, '0')}"`;

// export const handler = async (event) => {   //event [object object]
exports.handler = async (event) => {
  console.log(" Received event:", JSON.stringify(event));
  const results = [];

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      const { matchId, type, card,player, team, second } = body;
      console.log("CARD ---->",card)

      if (!matchId || !type || !player || !team || typeof second !== "number") {
        throw new Error("Missing or invalid fields: matchId, type, player, team, second");
      }

      const formattedTime = formatTime(second);
      const timestamp = new Date().toISOString();
      const commentary = type.toLowerCase() === "goal"
        ? `GOAL! ${player} scores for ${team} at ${formattedTime}`
        : `${player} receives a ${card?.toUpperCase() || "CARD"} card for ${team} at ${formattedTime}`;

      const item = {
        matchId,
        timestamp,
        player,
        team,
        type,
        second,
        formattedTime,
        commentary,
      };

      console.log(" Writing to DynamoDB:", item);

      await ddb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      }));

      results.push({ status: "success", commentary });
    } catch (error) {
      console.error(" Error processing record:", record, error);
      results.push({ status: "error", error: error.message });
    }
  }

  console.log(" Final Results:", JSON.stringify(results));
  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};
