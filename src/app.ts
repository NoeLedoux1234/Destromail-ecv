import express, { Request, Response } from 'express';
import taskRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());
app.use('/api/tasks', taskRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Task Manager API');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
  });
}

export default app;
