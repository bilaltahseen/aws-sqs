import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3000;



// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
