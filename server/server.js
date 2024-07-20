import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectionString } from './config/config.js'
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import shoppingRoutes from './routes/shoppingRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';

const port=3000

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*', 
    credentials: true // Enable credentials
  }));

// Routes
app.use('/api/user', userRoutes); 
app.use('/api/recipe', recipeRoutes); 
app.use('/api/shopping', shoppingRoutes); 
app.use('/api/meal', mealRoutes); 
app.use('/api/nutrition', nutritionRoutes); 


app.listen(port, async () => {
    try {
      await mongoose.connect(connectionString)
      console.log(`Nutri+ app listening on port ${port}!`);
    } catch (e) {
      console.log(e);
    }
  });
  