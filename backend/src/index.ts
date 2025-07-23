// import express module
import express, { Request, Response } from 'express';
// import cors module
import cors from 'cors';
// define app
const app = express()
// choose host
const PORT = 3023

// Accept Json Files
app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server running with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
