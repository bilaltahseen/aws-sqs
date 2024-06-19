import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Client } from './sqs';


const app = express();
const port = process.env.PORT || 3000;

const sqsClient = new Client('us-east-1');
const queueName = 'test-queue';



// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route
app.get('/', async (req: Request, res: Response) => {
    
    const queueUrl = await sqsClient.createQueue(queueName);
    // await sqsClient.sendMessage(queueUrl, 'Hello World');
    const messages = await sqsClient.receiveMessage(queueUrl);
    if(messages && messages.length > 0) {
        for (let i = 0; i < messages.length; i++) {
            await sqsClient.deleteMessage(queueUrl, messages[i].ReceiptHandle);
        }
    }
    res.send(messages ? messages : 'No messages found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
