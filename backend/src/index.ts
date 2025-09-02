// import express module
import express, { Request, Response } from 'express';
// import routes
import matchesRoutes from './routes/matchesRoutes';
import playerRoutes from './routes/playerRoutes';
import teamRoutes from './routes/teamRoutes';
import trainingRoutes from './routes/trainingRoutes';
// import cors module
import cors from 'cors';
// define app
const app = express()
// choose host
const PORT = 3023

// Accept Json Files
app.use(express.json());

app.use(cors());

// use routes endpoints to app
app.use('/matches', matchesRoutes);
app.use('/player', playerRoutes);
app.use('/team', teamRoutes);
app.use('/training', trainingRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server running with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
