import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";
dotenv.config();

const REGION = "us-east-1"; // change if needed

const client = new SQSClient({ region: REGION });
const QUEUE_URL = process.env.SQS_QUEUE_URL;

export const publishToQueue= async (payload)=> {
  if (!QUEUE_URL) throw new Error("Missing SQS_QUEUE_URL in env");

  const command = new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(payload),
  });

  try {
    const result = await client.send(command);
    console.log("Message is send to SQS: & the ID of the sent message is: ", result.MessageId);
    return result;
  } catch (error) {
    console.error(" Failed to send to SQS:", error);
    throw error;
  }
}
