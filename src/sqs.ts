const { SQSClient, CreateQueueCommand, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");

export class Client {
    private sqsClient: any = null;

    constructor(region: string) {
        this.sqsClient = new SQSClient({ region: region });
        console.log('SQS client is created');
    }

    async createQueue(queueName: string) {
        if (!queueName) {
            throw new Error('Queue name is required');
        }
        const command = new CreateQueueCommand({ QueueName: queueName });
        const response = await this.sqsClient.send(command);
        console.log('Queue created', response.QueueUrl);
        return response.QueueUrl;
    }

    async sendMessage(queueUrl: string, messageBody: string) {
        if (!queueUrl || !messageBody) {
            throw new Error('Queue URL and message body are required');
        }
        const command = new SendMessageCommand({ QueueUrl: queueUrl, MessageBody: messageBody });
        const response = await this.sqsClient.send(command);
        console.log('Message sent', response.MessageId);
        return response.MessageId;
    }

    async receiveMessage(queueUrl: string) {
        if (!queueUrl) {
            throw new Error('Queue URL is required');
        }
        const command = new ReceiveMessageCommand({ QueueUrl: queueUrl });
        const response = await this.sqsClient.send(command);
        console.log('Message received', response.Messages);
        return response.Messages;
    }

    async deleteMessage(queueUrl: string, receiptHandle: string) {
        if (!queueUrl || !receiptHandle) {
            throw new Error('Queue URL and receipt handle are required');
        }
        const command = new DeleteMessageCommand({ QueueUrl: queueUrl, ReceiptHandle: receiptHandle });
        const response = await this.sqsClient.send(command);
        console.log('Message deleted', response);
        return response;
    }

}