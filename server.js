import express from 'express';
const app = express();
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './db.js';
import cors from 'cors';
dotenv.config();

import userRoutes from './routes/userRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';
import assignRoutes from './routes/assignRoutes.js';
import slotRoutes from './routes/slotRoutes.js';

connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/assign', assignRoutes);
app.use('/api/slot/',slotRoutes);
app.use('/uploads',express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'Running Successfully.' });
});
app.use('/admin',express.static('admin'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
